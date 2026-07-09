import { PairValidator } from './PairValidator';

export class AssistManager {
  constructor(cells) {
    this.cells = cells;
    this.moves = [];
  }

  hint() {
    this.findAvailableMoves();
    return this.moves[0];
  }

  findAvailableMoves() {
    for (let i = 0; i < this.cells.length; i++) {
      if (!this.cells[i].matched) {
        for (let j = i + 1; j < this.cells.length; j++) {
          if (this.cells[j].matched) continue;
          const pairType = new PairValidator(this.cells, this.cells[i], this.cells[j]).checkPair();
          if (pairType) this.moves.push([this.cells[i], this.cells[j]]);
        }
      }
    }
  }

  countOfAvailableMoves() {
    this.findAvailableMoves();
    const count = this.moves.length;
    if (count > 5) {
      return '5+';
    } else {
      return count;
    }
  }

  revert() {}

  addNumbers() {}

  shuffle() {}

  eraser() {}
}
