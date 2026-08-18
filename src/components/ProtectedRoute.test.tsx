import { render, screen, waitFor } from "@testing-library/react";
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
});
