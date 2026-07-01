import { GameStat } from '@/components/GameStat';
import { Grid } from '@/components/Grid';
import { Header } from '@/components/Header';
import { GridGenerator } from '@/game/GridGenerator';
import { createElement } from '@/utils/dom';

export class GameScreen {
  constructor(title, { start }) {
    this.title = title;
    this.start = start;
    this.selectedCells = [];
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

    this.gameGrid = this.createGridClassic();
    container.append(header, subHeader, this.gameGrid);

    this.bindEvents();
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

  createGridClassic() {
    const classicNumbers = new GridGenerator().generateClassicNumbers();
    this.grid = new Grid(classicNumbers);

    return this.grid.render();
  }

  selectCells(event) {
    const cell = event.target.closest('.game-grid__cell');
    if (!cell) return;

    const id = cell.dataset.id;
    const cellObject = this.grid.getCellById(id);

    if (cellObject.selected) {
      cellObject.deselect();
      const index = this.selectedCells.indexOf(cellObject);
      if (index !== -1) this.selectedCells.splice(index, 1);
      return;
    }
    cellObject.select();
    this.selectedCells.push(cellObject);
    if (this.selectedCells.length === 2) {
      this.checkPair();
    }
  }

  checkPair() {}

  bindEvents() {
    this.gameGrid.addEventListener('click', (event) => {
      this.selectCells(event);
    });
  }

  destroy() {}
}
