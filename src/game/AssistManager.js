import { PairValidator } from './PairValidator';

export class AssistManager {
  constructor(cells) {
    this.cells = cells;
  }

  hint() {
    let pairType = false;
    for (let i = 0; i < this.cells.length; i++) {
      if (!this.cells[i].matched) {
        for (let j = i + 1; j < this.cells.length; j++) {
          if (this.cells[j].matched) continue;
          console.log(i, j);
          // console.log(this.cells.length);
          pairType = new PairValidator(this.cells, this.cells[i], this.cells[j]).checkPair();
          if (pairType) return [this.cells[i], this.cells[j]];
          console.log(pairType);
        }
      }
    }
    console.log(pairType);
  }

  revert() {}

  addNumbers() {}

  shuffle() {}

  eraser() {}
}
