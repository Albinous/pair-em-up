import { Button } from '@/components/Button';
import { GameStat } from '@/components/GameStat';
import { Header } from '@/components/Header';
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

    const header = new Header({ title: this.title, start: this.start }).render();

    const subHeader = createElement('div', {
      classes: ['game-values'],
    });
    const timer = this.createTimer();
    const score = this.createScore();
    const moves = this.createMoves();

    subHeader.append(timer, score, moves);
    container.append(header, subHeader);

    return container;
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

  destroy() {}
}
