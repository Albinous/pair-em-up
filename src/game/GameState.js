import { StorageService } from '@/storage/StorageService';

const STATE_KEY = 'game-state';

export class GameState {
  constructor() {
    this.storage = new StorageService();
  }

  save(state) {
    this.storage.set(STATE_KEY, state);
  }

  get() {
    return this.storage.get(STATE_KEY) || null;
  }

  clear() {
    this.storage.remove(STATE_KEY);
  }
}
