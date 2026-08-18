import * as Sentry from "@sentry/react";

type ErrorMetadata = {
  componentStack?: string | null;
};

const sentryDsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;
const appEnvironment = (import.meta.env.VITE_APP_ENV as string | undefined) ?? import.meta.env.MODE;
const appRelease = import.meta.env.VITE_APP_VERSION as string | undefined;

let monitoringInitialized = false;

export function initMonitoring() {
  if (!sentryDsn || monitoringInitialized) return;

  Sentry.init({
    dsn: sentryDsn,
    environment: appEnvironment,
    release: appRelease,
    sendDefaultPii: false,
  });

  monitoringInitialized = true;
}

export function reportError(error: Error, metadata: ErrorMetadata = {}) {
  if (!monitoringInitialized) {
    console.error("Uncaught error:", error, metadata.componentStack);
    return;
  }

  Sentry.withScope((scope) => {
    if (metadata.componentStack) {
      scope.setContext("react", {
        componentStack: metadata.componentStack,
      });
    }

    Sentry.captureException(error);
  });
}
