import { type FormEvent, useEffect, useState } from "react";
import { Lock } from "lucide-react";
import type { ReactNode } from "react";
import { supabase } from "../lib/supabase";

type Props = { children: ReactNode };

export function ProtectedRoute({ children }: Props) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
    });
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });

    setSubmitting(false);

    if (authError) {
      setError("Email ou mot de passe incorrect.");
    } else {
      setAuthed(true);
    }
  }

  // Chargement de la session en cours
  if (authed === null) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-night-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold-300/30 border-t-gold-300" />
      </div>
    );
  }

  if (authed) return <>{children}</>;

  return (
    <div className="grid min-h-[70vh] place-items-center px-4">
      <div className="w-full max-w-sm rounded-md border border-white/[0.08] bg-night-900/78 p-8 shadow-glow">
        <div className="flex flex-col items-center gap-3">
          <Lock className="h-8 w-8 text-gold-300" aria-hidden="true" />
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
              className="min-h-11 rounded-sm border border-white/[0.08] bg-white/5 px-3 text-base text-ivory transition focus:border-gold-300 focus:outline-none"
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
              className="min-h-11 rounded-sm border border-white/[0.08] bg-white/5 px-3 text-base text-ivory transition focus:border-gold-300 focus:outline-none"
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
            className="min-h-11 rounded-sm border border-gold-300 bg-gold-300 px-5 py-3 text-xs font-semibold uppercase text-night-950 transition hover:bg-gold-500 disabled:opacity-55"
          >
            {submitting ? "Connexion…" : "Accéder"}
          </button>
        </form>
      </div>
    </div>
  );
}
