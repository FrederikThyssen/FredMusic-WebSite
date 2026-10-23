import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProtectedRoute } from "./ProtectedRoute";

const auth = vi.hoisted(() => ({
  getSession: vi.fn(),
  signInWithPassword: vi.fn(),
}));

vi.mock("../lib/supabase", () => ({
  supabase: {
    auth,
  },
}));

function renderProtectedRoute() {
  return render(
    <ProtectedRoute>
      <div>Tableau de bord admin</div>
    </ProtectedRoute>,
  );
}

describe("ProtectedRoute", () => {
  beforeEach(() => {
    auth.getSession.mockReset();
    auth.signInWithPassword.mockReset();
    vi.restoreAllMocks();
  });

  it("shows the login form when no session exists", async () => {
    auth.getSession.mockResolvedValueOnce({ data: { session: null } });

    renderProtectedRoute();

    expect(await screen.findByRole("heading", { name: /accès admin/i })).toBeInTheDocument();
    expect(screen.queryByText(/tableau de bord admin/i)).not.toBeInTheDocument();
  });

  it("renders protected content when a session exists", async () => {
    auth.getSession.mockResolvedValueOnce({ data: { session: { user: { id: "admin-user" } } } });

    renderProtectedRoute();

    expect(await screen.findByText(/tableau de bord admin/i)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /accès admin/i })).not.toBeInTheDocument();
  });

  it("shows an error after a failed login", async () => {
    auth.getSession.mockResolvedValueOnce({ data: { session: null } });
    auth.signInWithPassword.mockResolvedValueOnce({ error: { message: "Invalid login credentials" } });

    renderProtectedRoute();

    await userEvent.type(await screen.findByLabelText(/email/i), "admin@example.com");
    await userEvent.type(screen.getByLabelText(/mot de passe/i), "wrong-password");
    await userEvent.click(screen.getByRole("button", { name: /accéder/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/email ou mot de passe incorrect/i);
    expect(screen.queryByText(/tableau de bord admin/i)).not.toBeInTheDocument();
  });

  it("renders protected content after a successful login", async () => {
    auth.getSession.mockResolvedValueOnce({ data: { session: null } });
    auth.signInWithPassword.mockResolvedValueOnce({ error: null });

    renderProtectedRoute();

    await userEvent.type(await screen.findByLabelText(/email/i), "admin@example.com");
    await userEvent.type(screen.getByLabelText(/mot de passe/i), "strong-password");
    await userEvent.click(screen.getByRole("button", { name: /accéder/i }));

    await waitFor(() => expect(screen.getByText(/tableau de bord admin/i)).toBeInTheDocument());
  });

  it("shows an unavailable screen when the session check fails, and recovers on retry", async () => {
    auth.getSession
      .mockRejectedValueOnce(new TypeError("Failed to fetch"))
      .mockResolvedValueOnce({ data: { session: null } });
    vi.spyOn(console, "error").mockImplementation(() => {});

    renderProtectedRoute();

    expect(await screen.findByRole("heading", { name: /service indisponible/i })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /réessayer/i }));

    expect(await screen.findByRole("heading", { name: /accès admin/i })).toBeInTheDocument();
  });

  it("does not blame the password when Supabase is unreachable", async () => {
    auth.getSession.mockResolvedValueOnce({ data: { session: null } });
    auth.signInWithPassword.mockResolvedValueOnce({
      error: { name: "AuthRetryableFetchError", status: 0, message: "Failed to fetch" },
    });
    vi.spyOn(console, "error").mockImplementation(() => {});

    renderProtectedRoute();

    await userEvent.type(await screen.findByLabelText(/email/i), "admin@example.com");
    await userEvent.type(screen.getByLabelText(/mot de passe/i), "strong-password");
    await userEvent.click(screen.getByRole("button", { name: /accéder/i }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/momentanément indisponible/i);
    expect(alert).not.toHaveTextContent(/mot de passe incorrect/i);
  });

  it("stops waiting when the session check hangs", async () => {
    vi.useFakeTimers();
    auth.getSession.mockReturnValueOnce(new Promise(() => {}));
    vi.spyOn(console, "error").mockImplementation(() => {});

    renderProtectedRoute();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10_000);
    });
    vi.useRealTimers();

    expect(screen.getByRole("heading", { name: /service indisponible/i })).toBeInTheDocument();
  });
});
