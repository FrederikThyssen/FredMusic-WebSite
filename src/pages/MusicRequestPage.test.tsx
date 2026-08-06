import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MusicRequestPage } from "./MusicRequestPage";

const fetchActiveEvent = vi.fn();
const insertMusicRequest = vi.fn();

vi.mock("../lib/api", () => ({
  fetchActiveEvent: (...args: unknown[]) => fetchActiveEvent(...args),
  insertMusicRequest: (...args: unknown[]) => insertMusicRequest(...args),
}));

describe("MusicRequestPage", () => {
  beforeEach(() => {
    fetchActiveEvent.mockReset();
    insertMusicRequest.mockReset();
  });

  it("shows validation errors for invalid music fields", async () => {
    fetchActiveEvent.mockResolvedValueOnce({ data: null });
    render(<MusicRequestPage />);

    fireEvent.change(screen.getByLabelText(/artiste/i), { target: { value: "A".repeat(121) } });
    fireEvent.change(screen.getByLabelText(/titre de la musique/i), { target: { value: "B".repeat(161) } });
    const submitButton = screen.getByRole("button", { name: /envoyer ma demande/i });
    fireEvent.submit(submitButton.closest("form")!);

    expect(await screen.findByText(/l'artiste ne peut pas dépasser/i)).toBeInTheDocument();
    expect(await screen.findByText(/le titre ne peut pas dépasser/i)).toBeInTheDocument();
    expect(insertMusicRequest).not.toHaveBeenCalled();
  });

  it("submits a valid music request", async () => {
    fetchActiveEvent.mockResolvedValueOnce({ data: { id: "event-id" } });
    insertMusicRequest.mockResolvedValueOnce({ error: null });
    render(<MusicRequestPage />);

    await userEvent.type(screen.getByLabelText(/artiste/i), "Daft Punk");
    await userEvent.type(screen.getByLabelText(/titre de la musique/i), "One More Time");
    await userEvent.click(screen.getByRole("button", { name: /envoyer ma demande/i }));

    await waitFor(() => expect(insertMusicRequest).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/demande envoyée/i)).toBeInTheDocument();
  });
});
