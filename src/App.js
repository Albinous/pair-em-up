import { StartScreen } from '@/screens/StartScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { GameScreen } from './screens/GameScreen';
import { ResultsScreen } from './screens/ResultsScreen';

export class App {
  constructor(root) {
    this.root = root;
  }
  init() {
    this.showScreen(this.createStartScreen());
  }

  createStartScreen() {
    return new StartScreen({
      actions: {
        classic: (restore = false) => this.showScreen(this.createGameScreen('classic', restore)),
        random: (restore = false) => this.showScreen(this.createGameScreen('random', restore)),
        chaotic: (restore = false) => this.showScreen(this.createGameScreen('chaotic', restore)),
        settings: () => this.showScreen(this.createSettingsScreen()),
        results: () => this.showScreen(this.createResultsScreen()),
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
        results: () => this.showScreen(this.createResultsScreen()),
      },
    });
  }

  createSettingsScreen() {
    return new SettingsScreen({
      start: () => this.showScreen(this.createStartScreen()),
    });
  }

  createResultsScreen() {
    return new ResultsScreen({
      start: () => this.showScreen(this.createStartScreen()),
    });
  }

  showScreen(screen) {
    this.root.replaceChildren(screen.render());
  }
}
