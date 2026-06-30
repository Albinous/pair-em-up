import { Button } from '@/components/Button';
import { createElement } from '@/utils/dom';

export class GameScreen {
  constructor(title, { start }) {
    this.title = title;
    this.start = start;
  }

  render() {
    const container = this.createContainer('main', 'game-screen');

    const header = createElement('header', {
      classes: ['game-header'],
    });
    this.backBtn = new Button({ classes: ['game-back'], text: 'Back' }).render();

    const title = this.createTitle();

    header.append(this.backBtn, title);

    const subHeader = this.createContainer('div', 'game-values');
    const timer = this.createTimer();
    const score = this.createScore();
    const moves = this.createMoves();

    subHeader.append(timer, score, moves);

    container.append(header, subHeader);

    this.bindEvents();

    return container;
  }

  createContainer(tag, className) {
    return createElement(`${tag}`, {
      classes: [`${className}`],
    });
  }

  createTitle() {
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

  createTimer() {
    const timer = createElement('div', {
      classes: ['game-timer'],
    });
    const timerTitle = createElement('h3', {
      classes: ['game-timer__title'],
      text: 'Time: ',
    });
    const timerValue = createElement('span', {
      classes: ['game-timer__value'],
      text: '00:00',
    });

    timer.append(timerTitle, timerValue);

    return timer;
  }

  createMoves() {
    const moves = createElement('div', {
      classes: ['game-moves'],
    });
    const movesTitle = createElement('h3', {
      classes: ['game-moves__title'],
      text: 'Moves: ',
    });
    const movesValue = createElement('span', {
      classes: ['game-moves__value'],
      text: '0',
    });

    moves.append(movesTitle, movesValue);

    return moves;
  }

  bindEvents() {
    this.backBtn.addEventListener('click', () => {
      this.start();
    });
  }

  destroy() {}
}
