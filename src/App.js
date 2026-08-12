import { StartScreen } from '@/screens/StartScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { GameScreen } from './screens/GameScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { StorageService } from './storage/StorageService';

export class App {
  constructor(root) {
    this.root = root;
    this.storage = new StorageService();
  }
  init() {
    this.showScreen(this.createStartScreen());
    this.applyTheme();
  }

  createStartScreen() {
    return new StartScreen({
      actions: {
        classic: (restore = false) => this.showScreen(this.createGameScreen('classic', restore)),
        random: (restore = false) => this.showScreen(this.createGameScreen('random', restore)),
        chaotic: (restore = false) => this.showScreen(this.createGameScreen('chaotic', restore)),
        settings: () => this.showScreen(this.createSettingsScreen('settings')),
        results: () => this.showScreen(this.createResultsScreen('results')),
      },
    });
  }

  createGameScreen(title, restore = false) {
    return new GameScreen(title, {
      restore,
      actions: {
        start: () => this.showScreen(this.createStartScreen()),
        playAgain: () => {
          localStorage.removeItem('game-state');
          localStorage.removeItem('autosave-game');
          this.showScreen(this.createGameScreen(title));
        },
        results: () => this.showScreen(this.createResultsScreen('results')),
        settings: () => this.showScreen(this.createSettingsScreen('settings')),
      },
      storage: this.storage,
    });
  }

  createSettingsScreen(title) {
    return new SettingsScreen(title, {
      actions: {
        start: () => this.showScreen(this.createStartScreen()),
      },
      storage: this.storage,
    });
  }

  createResultsScreen(title) {
    return new ResultsScreen(title, {
      actions: {
        start: () => this.showScreen(this.createStartScreen()),
      },
    });
  }

  showScreen(screen) {
    this.root.replaceChildren(screen.render());
  }

  applyTheme() {
    const settings = this.storage.get('settings');
    document.body.dataset.theme = settings.theme;
  }
}
