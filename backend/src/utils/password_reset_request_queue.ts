type QueueTask<T> = () => Promise<T>;

class PasswordResetRequestQueue {
  private pending: Array<{
    task: QueueTask<unknown>;
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
  }> = [];

  private running = false;

  enqueue<T>(task: QueueTask<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.pending.push({
        task: task as QueueTask<unknown>,
        resolve: resolve as (value: unknown) => void,
        reject,
      });

      void this.processNext();
    });
  }

  private async processNext(): Promise<void> {
    if (this.running) return;

    this.running = true;

    while (this.pending.length > 0) {
      const current = this.pending.shift();
      if (!current) break;

      try {
        const result = await current.task();
        current.resolve(result);
      } catch (error) {
        current.reject(error);
      }
    }

    this.running = false;
  }
}

export const passwordResetRequestQueue = new PasswordResetRequestQueue();
