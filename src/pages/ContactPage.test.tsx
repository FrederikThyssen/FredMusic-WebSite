import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ContactPage } from "./ContactPage";

const insertQuoteRequest = vi.fn();

vi.mock("../lib/api", () => ({
  insertQuoteRequest: (...args: unknown[]) => insertQuoteRequest(...args),
}));

describe("ContactPage", () => {
  beforeEach(() => {
    insertQuoteRequest.mockReset();
  });

  it("shows validation errors before submit", async () => {
    render(<ContactPage />);

    await userEvent.type(screen.getByLabelText(/nom \/ prénom/i), "A");
    await userEvent.type(screen.getByLabelText(/téléphone/i), "1");
    await userEvent.type(screen.getByLabelText(/email/i), "invalid-email");
    await userEvent.selectOptions(screen.getByLabelText(/type d'événement/i), "mariage");
    await userEvent.type(screen.getByLabelText(/votre message/i), "Message valide");
    const submitButton = screen.getByRole("button", { name: /envoyer ma demande/i });
    fireEvent.submit(submitButton.closest("form")!);

    expect(await screen.findByText(/le nom doit comporter/i)).toBeInTheDocument();
    expect(await screen.findByText(/adresse email invalide/i)).toBeInTheDocument();
    expect(await screen.findByText(/numéro de téléphone invalide/i)).toBeInTheDocument();
    expect(insertQuoteRequest).not.toHaveBeenCalled();
  });

  it("submits a valid quote request", async () => {
    insertQuoteRequest.mockResolvedValueOnce({ error: null });
    render(<ContactPage />);

    await userEvent.type(screen.getByLabelText(/nom \/ prénom/i), "Alice Martin");
    await userEvent.type(screen.getByLabelText(/téléphone/i), "0612345678");
    await userEvent.type(screen.getByLabelText(/email/i), "alice@example.com");
    await userEvent.selectOptions(screen.getByLabelText(/type d'événement/i), "mariage");
    await userEvent.type(screen.getByLabelText(/votre message/i), "Nous préparons notre mariage.");
    await userEvent.click(screen.getByRole("button", { name: /envoyer ma demande/i }));

    await waitFor(() => expect(insertQuoteRequest).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/demande enregistrée/i)).toBeInTheDocument();
  });

  it("does not show success when the quote request fails", async () => {
    insertQuoteRequest.mockResolvedValueOnce({ error: new Error("Network error") });
    render(<ContactPage />);

    await userEvent.type(screen.getByLabelText(/nom \/ prénom/i), "Alice Martin");
    await userEvent.type(screen.getByLabelText(/téléphone/i), "0612345678");
    await userEvent.type(screen.getByLabelText(/email/i), "alice@example.com");
    await userEvent.selectOptions(screen.getByLabelText(/type d'événement/i), "mariage");
    await userEvent.type(screen.getByLabelText(/votre message/i), "Nous préparons notre mariage.");
    await userEvent.click(screen.getByRole("button", { name: /envoyer ma demande/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/une erreur est survenue/i);
    expect(screen.queryByText(/demande enregistrée/i)).not.toBeInTheDocument();
  });

  it("keeps a slow quote submission pending until the request resolves", async () => {
    let resolveSubmission: (value: { error: null }) => void = () => undefined;
    insertQuoteRequest.mockReturnValueOnce(new Promise((resolve) => {
      resolveSubmission = resolve;
    }));
    render(<ContactPage />);

    await userEvent.type(screen.getByLabelText(/nom \/ prénom/i), "Alice Martin");
    await userEvent.type(screen.getByLabelText(/téléphone/i), "0612345678");
    await userEvent.type(screen.getByLabelText(/email/i), "alice@example.com");
    await userEvent.selectOptions(screen.getByLabelText(/type d'événement/i), "mariage");
    await userEvent.type(screen.getByLabelText(/votre message/i), "Nous préparons notre mariage.");
    await userEvent.click(screen.getByRole("button", { name: /envoyer ma demande/i }));

    expect(screen.getByRole("button", { name: /envoi en cours/i })).toBeDisabled();
    expect(screen.queryByText(/demande enregistrée/i)).not.toBeInTheDocument();

    resolveSubmission({ error: null });

    expect(await screen.findByText(/demande enregistrée/i)).toBeInTheDocument();
  });
});
