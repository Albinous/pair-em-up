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

  getCellById(id) {
    return this.cells.find((cell) => Number(id) === cell.id);
  }
}
