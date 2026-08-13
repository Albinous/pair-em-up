import { createElement } from '@/utils/dom';
import { Cell } from './Cell';

export class Grid {
  constructor() {
    this.cells = [];
    this.element = null;
  }

  render() {
    this.element = createElement('div', {
      classes: ['game-grid'],
    });

    return this.element;
  }

  appendCells(newCells) {
    newCells.forEach((cell) => {
      this.element.append(cell.render());

      if (cell.matched) {
        cell.match();
        cell.hide();
      }
    });
  }

  createCells(numbers) {
    const newCells = [];
    const startIndex = this.cells.length;
    numbers.forEach((number, index) => {
      const id = startIndex + index;
      const row = Math.floor(id / 9);
      const col = id % 9;
      const cell = new Cell(id, number, row, col);
      this.cells.push(cell);
      newCells.push(cell);
    });

    return newCells;
  }

  restoreCells(savedCells) {
    this.cells = [];
    const newCells = [];
    savedCells.forEach((savedCell) => {
      const row = Math.floor(savedCell.id / 9);
      const col = savedCell.id % 9;
      const cell = new Cell(savedCell.id, savedCell.value, row, col);
      cell.matched = savedCell.matched;
      this.cells.push(cell);
      newCells.push(cell);
    });

    return newCells;
  }

  restore(savedCells) {
    this.element.replaceChildren();
    const cells = this.restoreCells(savedCells);
    this.appendCells(cells);
  }

  getCellById(id) {
    return this.cells.find((cell) => Number(id) === cell.id);
  }
}
