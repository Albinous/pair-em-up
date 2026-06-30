import { Button } from '@/components/Button';
import { GameStat } from '@/components/GameStat';
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
    const score = new GameStat({
      title: 'Score: ',
      value: '0',
      suffix: '/ 100',
      classes: 'game-score',
    }).render();

    return score;
  }

  createTimer() {
    const timer = new GameStat({
      title: 'Time: ',
      value: '00:00',
      classes: 'game-timer',
    }).render();

    return timer;
  }

  createMoves() {
    const moves = new GameStat({
      title: 'Moves: ',
      value: '0',
      classes: 'game-moves',
    }).render();

    return moves;
  }

  bindEvents() {
    this.backBtn.addEventListener('click', () => {
      this.start();
    });
  }

  destroy() {}
}
