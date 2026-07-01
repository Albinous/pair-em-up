import { createElement } from '@/utils/dom';
import { Cell } from './Cell';
import { GridGenerator } from '@/game/GridGenerator';

export class Grid {
  constructor(numbers) {
    this.numbers = numbers;
  }

  render() {
    this.gameGrid = createElement('div', {
      classes: ['game-grid'],
    });

    this.createCells();

    return this.gameGrid;
  }

  createCells() {
    this.numbers.forEach((number) => {
      const cell = new Cell(number).render();
      this.gameGrid.append(cell);
    });
  }
}
