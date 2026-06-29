import { StartScreen } from '@/screens/StartScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { GameScreen } from './screens/GameScreen';
import { ResultsScreen } from './screens/ResultsScreen';

export class App {
  constructor(root) {
    this.root = root;
  }
  init() {
    const startScreen = this.createStartScreen();

    this.root.append(startScreen.render());
  }

  createStartScreen() {
    return new StartScreen({
      actions: {
        classic: () => this.showScreen(new GameScreen('Classic')),
        random: () => this.showScreen(new GameScreen('Random')),
        chaotic: () => this.showScreen(new GameScreen('Chaotic')),
        settings: () => this.showScreen(new SettingsScreen()),
        results: () => this.showScreen(this.createResultsScreen()),
      },
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
