import { GameStat } from '@/components/GameStat';
import { Grid } from '@/components/Grid';
import { Header } from '@/components/Header';
import { GridGenerator } from '@/game/GridGenerator';
import { PairValidator } from '@/game/PairValidator';
import { ScoreManager } from '@/game/ScoreManager';
import { SoundManager } from '@/game/SoundManager';
import { TimerManager } from '@/game/Timer';
import { createElement } from '@/utils/dom';

export class GameScreen {
  constructor(title, { start }) {
    this.title = title;
    this.start = start;
    this.selectedCells = [];
    this.scoreManager = new ScoreManager();
    this.timerManager = new TimerManager();
    this.soundManager = new SoundManager();
    this.movesCount = 0;
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
    this.timerManager.start(this.timer);

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
    this.score = new GameStat({
      title: 'Score: ',
      value: '0',
      suffix: '/ 100',
      classes: 'game-score',
    });

    return this.score.render();
  }

  createTimer() {
    this.timer = new GameStat({
      title: 'Time: ',
      value: '00:00',
      classes: 'game-timer',
    });

    return this.timer.render();
  }

  createMoves() {
    this.moves = new GameStat({
      title: 'Moves: ',
      value: '0',
      classes: 'game-moves',
    });

    return this.moves.render();
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
    this.soundManager.playSound('click');
    this.selectedCells.push(cellObject);
    if (this.selectedCells.length === 2) {
      this.checkPair(this.selectedCells[0], this.selectedCells[1]);
    }
  }

  checkPair(cell1, cell2) {
    this.moves.setValue(++this.movesCount);
    const pairType = new PairValidator(this.grid.cells, cell1, cell2).checkPair();

    pairType ? this.soundManager.playSound('success') : this.soundManager.playSound('error');

    const scoreValue = this.scoreManager.scoreCounter(pairType);
    this.score.setValue(scoreValue);

    this.selectedCells = [];
  }

  bindEvents() {
    this.gameGrid.addEventListener('click', (event) => {
      this.selectCells(event);
    });
  }

  destroy() {}
}
