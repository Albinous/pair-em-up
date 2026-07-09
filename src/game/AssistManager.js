import { PairValidator } from './PairValidator';

export class AssistManager {
  constructor(cells) {
    this.cells = cells;
  }

  hint() {
    const moves = this.findAvailableMoves();
    return moves[0];
  }

  findAvailableMoves() {
    const moves = [];
    for (let i = 0; i < this.cells.length; i++) {
      if (!this.cells[i].matched) {
        for (let j = i + 1; j < this.cells.length; j++) {
          if (this.cells[j].matched) continue;
          const pairType = new PairValidator(this.cells, this.cells[i], this.cells[j]).checkPair();
          if (pairType) moves.push([this.cells[i], this.cells[j]]);
        }
      }
    }
    return moves;
  }

  countOfAvailableMoves() {
    const moves = this.findAvailableMoves();
    const count = moves.length;
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
