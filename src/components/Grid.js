import { createElement } from '@/utils/dom';
import { Cell } from './Cell';

export class Grid {
  constructor(numbers) {
    this.numbers = numbers;
    this.cells = [];
    this.element = null;
  }

  render() {
    this.element = createElement('div', {
      classes: ['game-grid'],
    });

    this.createCells();

    return this.element;
  }

  createCells() {
    this.numbers.forEach((number, index) => {
      const row = Math.floor(index / 9);
      const col = index % 9;
      //   console.log(row, col);
      const cell = new Cell(index, number, row, col);
      this.cells.push(cell);
      this.element.append(cell.render());
    });
  }

  getCellById(id) {
    return this.cells.find((cell) => Number(id) === cell.id);
  }
}

// 0 - 0 0
// 9 - 1 0
// 1 - 0 1
// 10 - 1 1
// 18 - 2 0
// 26 - 2 9
