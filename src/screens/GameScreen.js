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

    const score = this.createScore();

    container.append(header, score);

    this.bindEvents();

    return container;
  }

  createTitle(titleTag, className) {
    return createElement('h1', {
      classes: ['main-title'],
      text: `${this.title}`,
    });
  }

  createScore() {
    const score = createElement('div', {
      classes: ['game-score'],
    });
    const scoreTitle = createElement('h3', {
      classes: ['game-score__title'],
      text: 'Score: ',
    });
    const scoreNumber = createElement('span', {
      classes: ['game-score__number'],
      text: '0',
    });

    const target = createElement('span', {
      classes: ['game-target__number'],
      text: '/ 100',
    });

    score.append(scoreTitle, scoreNumber, target);

    return score;
  }

  bindEvents() {
    this.backBtn.addEventListener('click', () => {
      this.start();
    });
  }

  destroy() {}
}
