import { createElement } from '@/utils/dom';
import { Cell } from './Cell';
import { GridGenerator } from '@/game/GridGenerator';

export class Grid {
  constructor() {}

  render() {
    this.gameGrid = createElement('div', {
      classes: ['game-grid'],
    });

    this.createCell();

    return this.gameGrid;
  }

  createCell() {
    const numbers = new GridGenerator().generateClassicNumber();

    numbers.forEach((n) => {
      const cell = new Cell(n).render();
      this.gameGrid.append(cell);
    });
  }

  createClassicNumbers(start = 1, end = 19) {
    let numbers = [];

    for (let i = start; i <= end; i++) {
      if (i % 10 !== 0) {
        String(i)
          .split('')
          .forEach((n) => numbers.push(+n));
      }
    }

    return numbers;
  }
}
