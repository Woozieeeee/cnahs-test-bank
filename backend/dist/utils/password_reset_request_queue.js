"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetRequestQueue = void 0;
class PasswordResetRequestQueue {
    constructor() {
        this.pending = [];
        this.running = false;
    }
    enqueue(task) {
        return new Promise((resolve, reject) => {
            this.pending.push({
                task: task,
                resolve: resolve,
                reject,
            });
            void this.processNext();
        });
    }
    async processNext() {
        if (this.running)
            return;
        this.running = true;
        while (this.pending.length > 0) {
            const current = this.pending.shift();
            if (!current)
                break;
            try {
                const result = await current.task();
                current.resolve(result);
            }
            catch (error) {
                current.reject(error);
            }
        }
        this.running = false;
    }
}
exports.passwordResetRequestQueue = new PasswordResetRequestQueue();
