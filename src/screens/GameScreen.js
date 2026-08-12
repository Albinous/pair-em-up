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
  constructor(title, { restore, actions, storage }) {
    this.title = title;
    this.restore = restore;
    this.actions = actions;
    this.storage = storage;
    this.grid = new Grid();
    this.gridGenerator = new GridGenerator();
    this.selectedCells = [];
    this.scoreManager = new ScoreManager();
    this.timerManager = new TimerManager();
    this.soundManager = new SoundManager(this.storage);
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
      classes: ['game-screen', 'container'],
    });

    const header = new Header({ title: this.title, start: this.actions.start }).render();

    const subHeader = createElement('div', {
      classes: ['game-values'],
    });
    const timer = this.createTimer();
    const score = this.createScore();
    const moves = this.createMoves();

    subHeader.append(timer, score, moves);

    let state = null;

    if (this.restore) {
      state = this.gameState.getAuto();
    }

    if (state) {
      this.gameGrid = this.createGrid(state.cells, true);
    } else {
      const gridNumbers = this.generateGridMode();
      this.gameGrid = this.createGrid(gridNumbers);
    }
    const assistBtns = this.createAssistBtns();
    const controlBtns = this.createControlBtns();
    const modal = this.modal.render();

    container.append(header, subHeader, this.gameGrid, assistBtns, controlBtns, modal);

    if (state) {
      this.loadGameState(state);
    }

    this.timerManager.start(this.timer);
    this.soundManager.playSound('game');

    this.bindEvents();
    return container;
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

  generateGridMode() {
    const generators = {
      classic: this.gridGenerator.generateClassicNumbers(),
      random: this.gridGenerator.generateRandomNumbers(),
      chaotic: this.gridGenerator.generateChaoticNumbers(),
    };

    return generators[this.title];
  }

  createGrid(data, isSaved = false) {
    const newCells = isSaved ? this.grid.restoreCells(data) : this.grid.createCells(data);
    const grid = this.grid.render();
    this.grid.appendCells(newCells);

    return grid;
  }

  createAssistBtns() {
    this.assistManager = new AssistManager(this.grid.cells);
    const container = createElement('div', {
      classes: ['game-assist__btns'],
    });

    this.assistValues = {
      hint: this.hintCount(),
      revert: 0,
      addNumbers: 10,
      shuffle: 5,
      eraser: 5,
    };

    this.assistBtns = {
      hint: this.createAssistBtn('hint', this.assistValues.hint),
      revert: this.createAssistBtn('revert', this.assistValues.revert),
      addNumbers: this.createAssistBtn('add numbers', this.assistValues.addNumbers),
      shuffle: this.createAssistBtn('shuffle', this.assistValues.shuffle),
      eraser: this.createAssistBtn('eraser', this.assistValues.eraser),
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

  updateAssistButton(name, value = this.assistValues[`${name}`]) {
    this.assistValues[name] = value;
    this.assistBtns[name].count.textContent = value;
    this.assistBtns[name].btn.disabled = value === 0;
  }

  updateHintCount(value = this.hintCount()) {
    this.assistBtns.hint.count.textContent = value;
  }

  updateRevert(lastMove = this.lastMove) {
    this.lastMove = lastMove;
    this.updateAssistButton('revert', Number(Boolean(lastMove)));
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
      this.soundManager.playSound('selection');
      return;
    }

    this.soundManager.playSound('selection');

    if (this.isErasing) {
      this.assistManager.erase(cellObject);
      this.isErasing = false;
      this.updateAssistButton('eraser', --this.assistValues.eraser);
      this.autosaveGameState();
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
      this.soundManager.playSound('failure');
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
    this.autosaveGameState();
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
      const result = this.historyResult('Win');
      this.history.saveResult(result);

      this.modal.setData('Win', stats);

      this.modal.show();
      this.timerManager.stop();

      this.outcome = {
        isFinished: true,
        title: 'Win',
        stats,
      };

      this.autosaveGameState();
      this.soundManager.playSound('game');
    }

    const assistEnd =
      this.assistValues.hint === 0 &&
      this.assistValues.addNumbers === 0 &&
      this.assistValues.shuffle === 0 &&
      this.assistValues.eraser === 0;

    const lineEnd = Math.floor(this.grid.cells.length / 9) > 49;

    if (assistEnd || lineEnd) {
      const result = this.historyResult('Loss');
      this.history.saveResult(result);
      this.modal.setData('Loss', stats);
      this.modal.show();
      this.timerManager.stop();
      this.outcome = {
        isFinished: true,
        title: 'Loss',
        stats,
      };

      this.autosaveGameState();
      this.soundManager.playSound('game');
    }
  }

  historyResult(outcome) {
    return {
      mode: this.title,
      score: this.score.value,
      time: this.timer.value,
      moves: this.moves.value,
      outcome,
    };
  }

  createControlBtns() {
    const container = createElement('div', {
      classes: ['game-control__btns'],
    });

    this.controlBtns = {
      save: this.createControlBtn('Save'),
      continue: this.createControlBtn('Continue'),
      reset: this.createControlBtn('Reset'),
      settings: this.createControlBtn('Settings'),
    };

    this.controlBtns.continue.disabled = true;

    container.append(...Object.values(this.controlBtns));

    return container;
  }

  createControlBtn(text) {
    const btn = new Button({
      classes: ['game-control__btn', 'btn'],
      text,
    }).render();

    return btn;
  }

  createState() {
    const cells = this.grid.cells.map((cell) => ({
      id: cell.id,
      value: cell.value,
      matched: cell.matched,
    }));

    const lastMove = this.lastMove
      ? {
          cells: this.lastMove.cells.map((cell) => cell.id),
          pairType: this.lastMove.pairType,
        }
      : null;

    const assists = {
      hint: this.assistValues.hint,
      revert: this.assistValues.revert,
      addNumbers: this.assistValues.addNumbers,
      shuffle: this.assistValues.shuffle,
      eraser: this.assistValues.eraser,
    };

    const state = {
      mode: this.title,
      score: this.score.value,
      time: this.timer.value,
      moves: this.moves.value,
      cells,
      lastMove,
      assists,
      outcome: this.outcome,
    };

    return state;
  }

  autosaveGameState() {
    const state = this.createState();
    this.gameState.autosave(state);
  }

  saveGameState() {
    const state = this.createState();
    this.gameState.save(state);
  }

  loadGameState(state) {
    if (!state) {
      return;
    }
    this.timer.setValue(state.time);
    this.timerManager.setElapsedTime(state.time);
    this.score.setValue(state.score);
    this.scoreManager.setScore(state.score);
    this.moves.setValue(state.moves);
    this.movesCount = state.moves;
    this.updateAssistButton('shuffle', state.assists.shuffle);
    this.updateAssistButton('addNumbers', state.assists.addNumbers);
    this.updateAssistButton('eraser', state.assists.eraser);

    const lastMove = state.lastMove
      ? {
          pairType: state.lastMove.pairType,
          cells: state.lastMove.cells.map((id) => this.grid.getCellById(id)),
        }
      : null;
    this.updateRevert(lastMove);

    this.loadOutcome(state.outcome);
  }

  loadOutcome(outcome) {
    if (!outcome?.isFinished) {
      return;
    }

    this.outcome = outcome;
    this.modal.setData(outcome.title, outcome.stats);
    this.modal.show();
    this.timerManager.stop();
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
      this.updateHintCount();
      this.soundManager.playSound('assist');
      this.autosaveGameState();
    });

    this.assistBtns.revert.btn.addEventListener('click', () => {
      if (!this.lastMove) return;
      this.assistManager.revert(this.lastMove.cells);
      this.moves.setValue(--this.movesCount);
      const scoreValue = this.scoreManager.removeScore(this.lastMove.pairType);
      this.score.setValue(scoreValue);
      this.updateHintCount();
      this.autosaveGameState();
      this.lastMove = null;
      this.updateRevert();
      this.soundManager.playSound('assist');
    });

    this.assistBtns.addNumbers.btn.addEventListener('click', () => {
      const numbers = this.assistManager.addNumbers(this.title);
      const newCells = this.grid.createCells(numbers);
      this.grid.appendCells(newCells);
      this.updateAssistButton('addNumbers', --this.assistValues.addNumbers);
      this.updateHintCount();
      this.checkResult();
      this.soundManager.playSound('assist');

      this.autosaveGameState();
    });

    this.assistBtns.shuffle.btn.addEventListener('click', () => {
      this.assistManager.shuffle();
      this.updateAssistButton('shuffle', --this.assistValues.shuffle);
      this.updateHintCount();
      this.soundManager.playSound('assist');

      this.autosaveGameState();
    });

    this.assistBtns.eraser.btn.addEventListener('click', () => {
      this.isErasing = true;
      this.soundManager.playSound('assist');
    });

    this.controlBtns.save.addEventListener('click', () => {
      this.saveGameState();
      this.controlBtns.continue.disabled = false;
    });

    this.controlBtns.reset.addEventListener('click', () => {
      this.actions.playAgain();
    });

    this.controlBtns.continue.addEventListener('click', () => {
      const state = this.gameState.get();
      if (!state) return;
      this.timerManager.stop();

      this.loadGameState(state);
      this.grid.restore(state.cells);
      this.timerManager.start(this.timer);
    });

    this.controlBtns.settings.addEventListener('click', () => {
      this.actions.settings();
    });
  }

  destroy() {}
}
