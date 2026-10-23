export class TimeoutError extends Error {
  constructor(message = "Operation timed out.") {
    super(message);
    this.name = "TimeoutError";
  }
}

/** Rejette si la promesse ne se résout pas dans le délai imparti. */
export function withTimeout<T>(promise: PromiseLike<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = setTimeout(() => reject(new TimeoutError()), ms);
    Promise.resolve(promise).then(
      (value) => {
        clearTimeout(timeoutId);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timeoutId);
        reject(error);
      },
    );
  });
}
