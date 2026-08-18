import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdminPage } from "./AdminPage";

const api = vi.hoisted(() => ({
  activateEvent: vi.fn(),
  archiveEvent: vi.fn(),
  createEvent: vi.fn(),
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
});
