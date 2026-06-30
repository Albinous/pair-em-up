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
        classic: () => this.showScreen(this.createGameScreen('Classic')),
        random: () => this.showScreen(this.createGameScreen('Random')),
        chaotic: () => this.showScreen(this.createGameScreen('Chaotic')),
        settings: () => this.showScreen(this.createSettingsScreen()),
        results: () => this.showScreen(this.createResultsScreen()),
      },
    });
  }

  createGameScreen(title) {
    return new GameScreen(title, {
      start: () => this.showScreen(this.createStartScreen()),
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
