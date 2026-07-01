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
      const cell = new Cell(index, number);
      this.cells.push(cell);
      this.element.append(cell.render());
    });
  }

  getCellById(id) {
    return this.cells.find((cell) => Number(id) === cell.id);
  }
}
