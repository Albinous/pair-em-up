import { createElement } from '@/utils/dom';

export class GameScreen {
  constructor() {}

  render() {
    const container = createElement('main', {
      classes: ['game-screen'],
    });

    const title = this.createTitle();

    container.append(title);

    return container;
  }

  createTitle() {
    return createElement('h1', {
      classes: ['main-title'],
      text: `Game`,
    });
  }

  destroy() {}
}
