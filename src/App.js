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
        classic: () => this.showScreen(new GameScreen('Classic')),
        random: () => this.showScreen(new GameScreen('Random')),
        chaotic: () => this.showScreen(new GameScreen('Chaotic')),
        settings: () => this.showScreen(this.createSettingsScreen()),
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
