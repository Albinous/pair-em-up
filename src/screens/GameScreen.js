import { Button } from '@/components/Button';
import { createElement } from '@/utils/dom';

export class GameScreen {
  constructor(title, { start }) {
    this.title = title;
    this.start = start;
  }

  render() {
    const container = createElement('main', {
      classes: ['game-screen'],
    });

    const header = createElement('header', {
      classes: ['game-header'],
    });

    this.backBtn = new Button({ classes: ['game-back'], text: 'Back' }).render();

    const title = this.createTitle();

    header.append(this.backBtn, title);

    container.append(header);

    this.bindEvents();

    return container;
  }

  createTitle() {
    return createElement('h1', {
      classes: ['main-title'],
      text: `${this.title}`,
    });
  }

  bindEvents() {
    this.backBtn.addEventListener('click', () => {
      this.start();
    });
  }

  destroy() {}
}
