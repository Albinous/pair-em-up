import { StartScreen } from '@/screens/StartScreen';

export class App {
  constructor(root) {
    this.root = root;
  }
  init() {
    const startScreen = new StartScreen();

    this.root.append(startScreen.render());
  }
}
