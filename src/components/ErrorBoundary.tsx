import { Component, type ErrorInfo, type ReactNode } from "react";
import { reportError } from "../lib/monitoring";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    reportError(error, { componentStack: info.componentStack });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid min-h-screen place-items-center bg-night-950 px-4 text-center text-ivory">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-300">Erreur</p>
            <h1 className="mt-4 font-display text-4xl text-ivory">Une erreur est survenue</h1>
            <p className="mt-4 text-lg text-ivory/70">Rechargez la page ou revenez plus tard.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-8 inline-flex items-center justify-center rounded-sm border border-gold-300 bg-gold-300 px-5 py-3 text-xs font-semibold uppercase text-night-950 transition hover:bg-gold-500"
            >
              Recharger la page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
