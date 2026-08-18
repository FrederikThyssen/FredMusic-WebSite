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
});
