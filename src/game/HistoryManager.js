import { StorageService } from '@/storage/StorageService';

const HISTORY_KEY = 'history';

export class HistoryManager {
  constructor() {
    this.storage = new StorageService();
  }
  getHistory() {
    return this.storage.get(HISTORY_KEY) || [];
  }

  saveResult(result) {
    const history = this.getHistory();

    history.push(result);
    this.storage.set(HISTORY_KEY, history);
  }

  clearHistory() {}
}
