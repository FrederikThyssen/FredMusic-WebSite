import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdminPage } from "./AdminPage";

const api = vi.hoisted(() => ({
  activateEvent: vi.fn(),
  archiveEvent: vi.fn(),
  createEvent: vi.fn(),
  deleteQuoteRequests: vi.fn(),
  fetchAllEvents: vi.fn(),
  fetchMusicRequests: vi.fn(),
  fetchQuoteRequests: vi.fn(),
  updateMusicStatus: vi.fn(),
  updateQuoteStatus: vi.fn(),
}));

vi.mock("../lib/api", () => api);

vi.mock("../lib/supabase", () => ({
  supabase: {
    auth: {
      signOut: vi.fn(),
    },
  },
}));

function setupAdminData() {
  api.fetchQuoteRequests.mockResolvedValue({ data: [] });
  api.fetchMusicRequests.mockResolvedValue({ data: [] });
  api.fetchAllEvents.mockResolvedValue({
    data: [
      {
        id: "event-active",
        name: "Mariage Claire & Thomas",
        is_active: true,
        created_at: "2026-08-18T10:00:00.000Z",
        archived_at: null,
      },
    ],
  });
}

function setupAdminDataWithRequests() {
  api.fetchQuoteRequests.mockResolvedValue({
    data: [
      {
        id: "quote-pending",
        name: "Alice Martin",
        email: "alice@example.com",
        phone: "0612345678",
        event_type: "Mariage",
        event_date: "2026-09-12",
        location: "Arras",
        guests_count: 120,
        message: "Besoin d'un DJ.",
        status: "pending",
        created_at: "2026-08-18T10:00:00.000Z",
      },
      {
        id: "quote-accepted",
        name: "Bob Durant",
        email: "bob@example.com",
        phone: null,
        event_type: "Entreprise",
        event_date: null,
        location: "Lille",
        guests_count: null,
        message: null,
        status: "accepted",
        created_at: "2026-08-18T11:00:00.000Z",
      },
    ],
  });
  api.fetchMusicRequests.mockResolvedValue({
    data: [
      {
        id: "music-pending",
        event_id: "event-active",
        guest_name: "Camille",
        artist: "Daft Punk",
        song_title: "One More Time",
        message: null,
        status: "pending",
        created_at: "2026-08-18T12:00:00.000Z",
      },
      {
        id: "music-played",
        event_id: "event-active",
        guest_name: "Nora",
        artist: "Justice",
        song_title: "D.A.N.C.E.",
        message: null,
        status: "played",
        created_at: "2026-08-18T13:00:00.000Z",
      },
    ],
  });
  api.fetchAllEvents.mockResolvedValue({
    data: [
      {
        id: "event-active",
        name: "Mariage Claire & Thomas",
        is_active: true,
        created_at: "2026-08-18T10:00:00.000Z",
        archived_at: null,
      },
    ],
  });
}

describe("AdminPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    Object.values(api).forEach((mock) => mock.mockReset());
    setupAdminData();
  });

  it("asks for confirmation before archiving the active event", async () => {
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(false);

    render(<AdminPage />);

    await userEvent.click(await screen.findByRole("button", { name: /archiver/i }));

    expect(confirm).toHaveBeenCalledWith(expect.stringContaining("Mariage Claire & Thomas"));
    expect(api.archiveEvent).not.toHaveBeenCalled();
  });

  it("prevents duplicate event creation while the request is pending", async () => {
    let resolveCreate!: (value: { error: null }) => void;
    const createPromise = new Promise<{ error: null }>((resolve) => {
      resolveCreate = resolve;
    });
    api.createEvent.mockReturnValue(createPromise);

    render(<AdminPage />);

    await userEvent.type(await screen.findByPlaceholderText(/nom de la soirée/i), "Soirée entreprise");
    await userEvent.click(screen.getByRole("button", { name: /^créer$/i }));

    expect(await screen.findByRole("button", { name: /création/i })).toBeDisabled();
    await userEvent.click(screen.getByRole("button", { name: /création/i }));

    expect(api.createEvent).toHaveBeenCalledTimes(1);
    expect(api.createEvent).toHaveBeenCalledWith("Soirée entreprise");

    resolveCreate({ error: null });
    await waitFor(() => expect(screen.getByRole("button", { name: /^créer$/i })).toBeDisabled());
  });

  it("filters quote requests by status", async () => {
    setupAdminDataWithRequests();

    render(<AdminPage />);

    expect(await screen.findByText("Alice Martin")).toBeInTheDocument();
    expect(screen.getByText("Bob Durant")).toBeInTheDocument();

    await userEvent.selectOptions(screen.getByLabelText(/filtrer les devis/i), "accepted");

    expect(screen.queryByText("Alice Martin")).not.toBeInTheDocument();
    expect(screen.getByText("Bob Durant")).toBeInTheDocument();
  });

  it("filters music requests by status", async () => {
    setupAdminDataWithRequests();

    render(<AdminPage />);

    expect(await screen.findByText("One More Time")).toBeInTheDocument();
    expect(screen.getByText("D.A.N.C.E.")).toBeInTheDocument();

    await userEvent.selectOptions(screen.getByLabelText(/filtrer les musiques/i), "played");

    expect(screen.queryByText("One More Time")).not.toBeInTheDocument();
    expect(screen.getByText("D.A.N.C.E.")).toBeInTheDocument();
  });

  it("shows a retryable error instead of spinning forever when loading fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    api.fetchQuoteRequests
      .mockResolvedValueOnce({ data: null, error: { message: "upstream unavailable" } })
      .mockResolvedValueOnce({ data: [] });

    render(<AdminPage />);

    expect(await screen.findByRole("alert")).toHaveTextContent(/impossible de charger les données/i);
    await userEvent.click(screen.getByRole("button", { name: /réessayer/i }));

    expect(await screen.findByText("Mariage Claire & Thomas")).toBeInTheDocument();
    expect(screen.queryByText(/impossible de charger les données/i)).not.toBeInTheDocument();
  });

  describe("quote deletion", () => {
    beforeEach(() => {
      setupAdminDataWithRequests();
    });

    it("deletes a single quote after confirmation", async () => {
      vi.spyOn(window, "confirm").mockReturnValue(true);
      api.deleteQuoteRequests.mockResolvedValue({ data: [{ id: "quote-pending" }], error: null });

      render(<AdminPage />);
      await screen.findByText("Alice Martin");

      const aliceCard = screen.getByText("Alice Martin").closest("article")!;
      await userEvent.click(within(aliceCard).getByRole("button", { name: /^supprimer$/i }));

      expect(api.deleteQuoteRequests).toHaveBeenCalledWith(["quote-pending"]);
      await waitFor(() => expect(screen.queryByText("Alice Martin")).not.toBeInTheDocument());
      expect(screen.getByText("Bob Durant")).toBeInTheDocument();
    });

    it("does nothing when the confirmation is cancelled", async () => {
      vi.spyOn(window, "confirm").mockReturnValue(false);

      render(<AdminPage />);
      const aliceCard = (await screen.findByText("Alice Martin")).closest("article")!;
      await userEvent.click(within(aliceCard).getByRole("button", { name: /^supprimer$/i }));

      expect(api.deleteQuoteRequests).not.toHaveBeenCalled();
      expect(screen.getByText("Alice Martin")).toBeInTheDocument();
    });

    it("deletes all selected quotes at once", async () => {
      const confirm = vi.spyOn(window, "confirm").mockReturnValue(true);
      api.deleteQuoteRequests.mockResolvedValue({
        data: [{ id: "quote-pending" }, { id: "quote-accepted" }],
        error: null,
      });

      render(<AdminPage />);
      await screen.findByText("Alice Martin");

      const bulkButton = screen.getByRole("button", { name: /supprimer la sélection \(0\)/i });
      expect(bulkButton).toBeDisabled();

      await userEvent.click(screen.getByLabelText(/tout sélectionner/i));
      await userEvent.click(screen.getByRole("button", { name: /supprimer la sélection \(2\)/i }));

      expect(confirm).toHaveBeenCalledWith(expect.stringContaining("2 devis"));
      expect(api.deleteQuoteRequests).toHaveBeenCalledWith(["quote-pending", "quote-accepted"]);
      expect(await screen.findByText(/aucune demande pour l'instant/i)).toBeInTheDocument();
    });

    it("only deletes visible selected quotes after a filter change", async () => {
      vi.spyOn(window, "confirm").mockReturnValue(true);
      api.deleteQuoteRequests.mockResolvedValue({ data: [{ id: "quote-accepted" }], error: null });

      render(<AdminPage />);
      await screen.findByText("Alice Martin");

      await userEvent.click(screen.getByLabelText(/sélectionner le devis de alice martin/i));
      await userEvent.selectOptions(screen.getByLabelText(/filtrer les devis/i), "accepted");
      await userEvent.click(screen.getByLabelText(/sélectionner le devis de bob durant/i));
      await userEvent.click(screen.getByRole("button", { name: /supprimer la sélection \(1\)/i }));

      expect(api.deleteQuoteRequests).toHaveBeenCalledWith(["quote-accepted"]);
    });

    it("warns when the database refuses to delete some quotes", async () => {
      vi.spyOn(window, "confirm").mockReturnValue(true);
      api.deleteQuoteRequests.mockResolvedValue({ data: [], error: null });

      render(<AdminPage />);
      const aliceCard = (await screen.findByText("Alice Martin")).closest("article")!;
      await userEvent.click(within(aliceCard).getByRole("button", { name: /^supprimer$/i }));

      expect(await screen.findByRole("alert")).toHaveTextContent(/n'ont pas pu être supprimés/i);
      expect(screen.getByText("Alice Martin")).toBeInTheDocument();
    });
  });
});
