import { type FormEvent, useCallback, useEffect, useState } from "react";
import { CloudOff, Lock } from "lucide-react";
import type { ReactNode } from "react";
import { supabase } from "../lib/supabase";
import { withTimeout } from "../utils/withTimeout";

type Props = { children: ReactNode };

type AuthState = "checking" | "authed" | "anonymous" | "unavailable";

const AUTH_TIMEOUT_MS = 10_000;
const UNAVAILABLE_MESSAGE =
  "Le service d'administration est momentanément indisponible. Réessayez dans quelques instants.";

type AuthErrorLike = { status?: number; code?: string; message?: string };

/** Vrai uniquement quand Supabase a répondu et refusé les identifiants. */
function isCredentialError(error: AuthErrorLike) {
  return (
    error.status === 400 ||
    error.code === "invalid_credentials" ||
    /invalid login credentials/i.test(error.message ?? "")
  );
}

export function ProtectedRoute({ children }: Props) {
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const checkSession = useCallback(async () => {
    setAuthState("checking");
    try {
      const { data, error: sessionError } = await withTimeout(supabase.auth.getSession(), AUTH_TIMEOUT_MS);
      if (sessionError) throw sessionError;
      setAuthState(data.session ? "authed" : "anonymous");
    } catch (err) {
      console.error("Admin session check failed.", err);
      setAuthState("unavailable");
    }
  }, []);

  useEffect(() => {
    void checkSession();
  }, [checkSession]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    try {
      const { error: authError } = await withTimeout(
        supabase.auth.signInWithPassword({
          email: String(formData.get("email") ?? ""),
          password: String(formData.get("password") ?? ""),
        }),
        AUTH_TIMEOUT_MS,
      );

      if (!authError) {
        setAuthState("authed");
      } else if (isCredentialError(authError)) {
        setError("Email ou mot de passe incorrect.");
      } else {
        console.error("Admin sign-in failed.", authError);
        setError(UNAVAILABLE_MESSAGE);
      }
    } catch (err) {
      console.error("Admin sign-in failed.", err);
      setError(UNAVAILABLE_MESSAGE);
    } finally {
      setSubmitting(false);
    }
  }

  if (authState === "checking") {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-night-950" role="status" aria-label="Vérification de la session">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold-300/20 border-t-gold-200" />
      </div>
    );
  }

  if (authState === "authed") return <>{children}</>;

  if (authState === "unavailable") {
    return (
      <div className="grid min-h-[70vh] place-items-center px-4">
        <div className="w-full max-w-sm rounded-md border border-white/[0.08] bg-night-900/78 p-8 text-center shadow-glow">
          <CloudOff className="mx-auto h-8 w-8 text-gold-200/75" aria-hidden="true" />
          <h1 className="mt-3 font-display text-2xl text-ivory">Service indisponible</h1>
          <p role="alert" className="mt-4 text-sm leading-6 text-ivory/70">{UNAVAILABLE_MESSAGE}</p>
          <button
            type="button"
            onClick={() => void checkSession()}
            className="mt-6 min-h-11 w-full rounded-sm border border-gold-500 bg-gold-500 px-5 py-3 text-xs font-semibold uppercase text-night-950 transition hover:border-gold-400 hover:bg-gold-400"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-[70vh] place-items-center px-4">
      <div className="w-full max-w-sm rounded-md border border-white/[0.08] bg-night-900/78 p-8 shadow-glow">
        <div className="flex flex-col items-center gap-3">
          <Lock className="h-8 w-8 text-gold-200/75" aria-hidden="true" />
          <h1 className="font-display text-2xl text-ivory">Accès admin</h1>
        </div>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm text-ivory/82" htmlFor="admin-email">
            Email
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="min-h-11 rounded-sm border border-white/[0.08] bg-white/5 px-3 text-base text-ivory transition focus:border-gold-200 focus:outline-none"
            />
          </label>
          <label className="grid gap-2 text-sm text-ivory/82" htmlFor="admin-password">
            Mot de passe
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              aria-describedby={error ? "admin-pwd-error" : undefined}
              className="min-h-11 rounded-sm border border-white/[0.08] bg-white/5 px-3 text-base text-ivory transition focus:border-gold-200 focus:outline-none"
            />
            {error ? (
              <span id="admin-pwd-error" role="alert" className="text-sm text-red-300">
                {error}
              </span>
            ) : null}
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="min-h-11 rounded-sm border border-gold-500 bg-gold-500 px-5 py-3 text-xs font-semibold uppercase text-night-950 transition hover:border-gold-400 hover:bg-gold-400 disabled:opacity-55"
          >
            {submitting ? "Connexion…" : "Accéder"}
          </button>
        </form>
      </div>
    </div>
  );
}
