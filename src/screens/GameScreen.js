import { Button } from '@/components/Button';
import { GameModal } from '@/components/GameModal';
import { GameStat } from '@/components/GameStat';
import { Grid } from '@/components/Grid';
import { Header } from '@/components/Header';
import { AssistManager } from '@/game/AssistManager';
import { GameState } from '@/game/GameState';
import { GridGenerator } from '@/game/GridGenerator';
import { HistoryManager } from '@/game/HistoryManager';
import { PairValidator } from '@/game/PairValidator';
import { ScoreManager } from '@/game/ScoreManager';
import { SoundManager } from '@/game/SoundManager';
import { TimerManager } from '@/game/Timer';
import { createElement } from '@/utils/dom';

export class GameScreen {
  constructor(title, { actions }) {
    this.title = title;
    this.actions = actions;
    this.selectedCells = [];
    this.scoreManager = new ScoreManager();
    this.timerManager = new TimerManager();
    this.soundManager = new SoundManager();
    this.modal = new GameModal({
      actions: this.actions,
    });
    this.movesCount = 0;
    this.isErasing = false;
    this.history = new HistoryManager();
    this.gameState = new GameState();
  }

  render() {
    const container = createElement('main', {
      classes: ['game-screen'],
    });

    const header = new Header({ title: this.title, start: this.actions.start }).render();

    const subHeader = createElement('div', {
      classes: ['game-values'],
    });
    const timer = this.createTimer();
    const score = this.createScore();
    const moves = this.createMoves();
    this.timerManager.start(this.timer);

    subHeader.append(timer, score, moves);

    this.gameGrid = this.createGridClassic();

    const assistBtns = this.createAssistBtns();

    const modal = this.modal.render();

    container.append(header, subHeader, this.gameGrid, assistBtns, modal);

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
    this.grid = new Grid();
    const newCells = this.grid.createCells(classicNumbers);
    const grid = this.grid.render();
    this.grid.appendCells(newCells);

    return grid;
  }

  createAssistBtns() {
    this.assistManager = new AssistManager(this.grid.cells);
    const container = createElement('div', {
      classes: ['game-assist__btns'],
    });

    const hint = this.createAssistBtn('hint', this.hintCount());
    this.revertValue = 1;
    this.addNumbersValue = 2;
    this.shuffleValue = 5;
    this.eraserValue = 5;

    this.assistBtns = {
      hint,
      revert: this.createAssistBtn('revert', this.revertValue),
      addNumbers: this.createAssistBtn('add numbers', this.addNumbersValue),
      shuffle: this.createAssistBtn('shuffle', this.shuffleValue),
      eraser: this.createAssistBtn('eraser', this.eraserValue),
    };

    this.updateRevert();

    const elements = Object.values(this.assistBtns).map((btn) => btn.element);

    container.append(...elements);

    return container;
  }

  createAssistBtn(name, moves = '') {
    const div = createElement('div', {
      classes: ['game-assist__item'],
    });
    const btn = new Button({
      classes: ['game-assist__btn'],
      text: name,
    }).render();

    const count = createElement('span', {
      classes: ['game-assist__count'],
      text: moves,
    });

    div.append(btn, count);

    return {
      element: div,
      btn,
      count,
    };
  }

  hintCount() {
    return this.assistManager.countOfAvailableMoves();
  }

  updateHintCount() {
    this.assistBtns.hint.count.textContent = this.hintCount();
  }

  updateRevert() {
    const hasLastMove = Boolean(this.lastMove);
    this.assistBtns.revert.count.textContent = Number(hasLastMove);
    this.assistBtns.revert.btn.disabled = !hasLastMove;
  }

  updateAddNumbers() {
    this.assistBtns.addNumbers.count.textContent = --this.addNumbersValue;
    this.assistBtns.addNumbers.btn.disabled = this.addNumbersValue === 0;
  }

  updateShuffle() {
    this.assistBtns.shuffle.count.textContent = --this.shuffleValue;
    this.assistBtns.shuffle.btn.disabled = this.shuffleValue === 0;
  }

  updateEraser() {
    this.assistBtns.eraser.count.textContent = --this.eraserValue;
    this.assistBtns.eraser.btn.disabled = this.eraserValue === 0;
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

    this.soundManager.playSound('click');

    if (this.isErasing) {
      this.assistManager.erase(cellObject);
      this.isErasing = false;
      this.updateEraser();
      this.updateHintCount();
      return;
    }
    cellObject.select();
    this.selectedCells.push(cellObject);
    if (this.selectedCells.length === 2) {
      this.checkPair(this.selectedCells[0], this.selectedCells[1]);
    }
  }

  checkPair(cell1, cell2) {
    this.moves.setValue(++this.movesCount);
    const validator = new PairValidator(this.grid.cells, cell1, cell2);
    const pairType = validator.checkPair();

    if (!pairType) {
      this.soundManager.playSound('error');
      this.selectedCells = [];
      return this.invalidPair(cell1, cell2);
    }

    this.validPair(cell1, cell2);
    this.soundManager.playSound('success');

    const scoreValue = this.scoreManager.addScore(pairType);
    this.score.setValue(scoreValue);
    this.updateHintCount();
    this.lastMove = {
      cells: [cell1, cell2],
      pairType,
    };
    this.updateRevert();
    this.saveGameState();
    this.checkResult();
    this.selectedCells = [];
  }

  checkResult() {
    const isWin = +this.score.value >= 100;

    const stats = [
      { title: 'Score', value: this.score.value },
      { title: 'Time', value: this.timer.value },
      { title: 'Moves', value: this.moves.value },
    ];

    if (isWin) {
      const result = {
        mode: this.title,
        score: this.score.value,
        time: this.timer.value,
        moves: this.moves.value,
        date: Date.now(),
      };
      this.history.saveResult(result);

      this.modal.setData('Win', stats);

      this.modal.show();
      this.timerManager.stop();
    }

    const assistEnd =
      this.hintCount() === 0 &&
      this.addNumbersValue === 0 &&
      this.shuffleValue === 0 &&
      this.eraserValue === 0;

    const lineEnd = Math.floor(this.grid.cells.length / 9) > 49;

    if (assistEnd || lineEnd) {
      this.modal.setData('Lose', stats);
      this.modal.show();
      this.timerManager.stop();
    }
  }

  saveGameState() {
    const cells = this.grid.cells.map((cell) => ({
      id: cell.id,
      value: cell.value,
      matched: cell.matched,
    }));
    const state = {
      mode: this.title,
      score: this.score.value,
      time: this.timer.value,
      moves: this.moves.value,
      cells,
    };
    this.gameState.save(state);
  }

  loadGameState() {
    const state = this.gameState.get();

    if (!state) {
      return;
    }

    this.score.setValue(state.score);
  }

  validPair(cell1, cell2) {
    cell1.match();
    cell2.match();

    setTimeout(() => {
      cell1.hide();
      cell2.hide();
    }, 300);

    return true;
  }

  invalidPair(cell1, cell2) {
    cell1.deselect();
    cell2.deselect();

    return false;
  }

  bindEvents() {
    this.gameGrid.addEventListener('click', (event) => {
      this.selectCells(event);
    });
    this.assistBtns.hint.element.addEventListener('click', () => {
      const cells = this.assistManager.hint();
      if (!cells) return;
      cells[0].showHint();
      cells[1].showHint();
      this.updateHintCount();
    });

    this.assistBtns.revert.btn.addEventListener('click', () => {
      if (!this.lastMove) return;
      this.assistManager.revert(this.lastMove.cells);
      this.moves.setValue(--this.movesCount);
      const scoreValue = this.scoreManager.removeScore(this.lastMove.pairType);
      this.score.setValue(scoreValue);
      this.updateHintCount();

      this.lastMove = null;
      this.updateRevert();
    });

    this.assistBtns.addNumbers.btn.addEventListener('click', () => {
      const numbers = this.assistManager.addNumbers();
      const newCells = this.grid.createCells(numbers);
      this.grid.appendCells(newCells);
      this.updateAddNumbers();
      this.updateHintCount();
    });

    this.assistBtns.shuffle.btn.addEventListener('click', () => {
      this.assistManager.shuffle();
      this.updateShuffle();
      this.updateHintCount();
    });

    this.assistBtns.eraser.btn.addEventListener('click', () => {
      this.isErasing = true;
    });
  }

  destroy() {}
}
