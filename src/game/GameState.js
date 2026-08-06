import { StorageService } from '@/storage/StorageService';

const STATE_KEY = 'game-state';
const AUTO_KEY = 'autosave-game';

export class GameState {
  constructor() {
    this.storage = new StorageService();
  }

  save(state) {
    this.storage.set(STATE_KEY, state);
  }

  autosave(state) {
    this.storage.set(AUTO_KEY, state);
  }

  get() {
    return this.storage.get(STATE_KEY) || null;
  }

  getAuto() {
    return this.storage.get(AUTO_KEY) || null;
  }

  clear() {
    this.storage.remove(STATE_KEY);
  }

  clearAuto() {
    this.storage.remove(AUTO_KEY);
  }
}
