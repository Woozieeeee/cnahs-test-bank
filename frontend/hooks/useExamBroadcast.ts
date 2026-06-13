// Simple event emitter for exam creation/updates across the app
class ExamEventEmitter {
  private listeners: Map<string, Set<(data?: any) => void>> = new Map();

  on(event: string, callback: (data?: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    // Return unsubscribe function
    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  emit(event: string, data?: any) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }
}

export const examEventEmitter = new ExamEventEmitter();

export function useExamBroadcast() {
  return {
    notifyExamCreated: (examData: any) => {
      examEventEmitter.emit('exam:created', examData);
    },
    notifyExamUpdated: (examData: any) => {
      examEventEmitter.emit('exam:updated', examData);
    },
    onExamCreated: (callback: (data?: any) => void) => {
      return examEventEmitter.on('exam:created', callback);
    },
    onExamUpdated: (callback: (data?: any) => void) => {
      return examEventEmitter.on('exam:updated', callback);
    },
  };
}
