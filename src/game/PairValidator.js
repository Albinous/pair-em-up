export class PairValidator {
  constructor(cells, cell1, cell2) {
    this.cells = cells;
    this.cell1 = cell1;
    this.cell2 = cell2;
  }
  checkPair() {
    const isSumTen = this.cell1.value + this.cell2.value === 10;
    const isEqual = this.cell1.value === this.cell2.value;

    const rowDistance = Math.abs(this.cell2.row - this.cell1.row);
    const colDistance = Math.abs(this.cell2.col - this.cell1.col);
    const isAdjacentVertical = this.cell1.col === this.cell2.col && rowDistance === 1;
    const isAdjacentHorizontal = this.cell1.row === this.cell2.row && colDistance === 1;
    const isAdjacent = isAdjacentVertical || isAdjacentHorizontal;

    const isSameRow = this.cell1.row === this.cell2.row && colDistance !== 1;
    const isSameCol = this.cell1.col === this.cell2.col && rowDistance !== 1;

    if (!isSumTen && !isEqual) {
      return this.invalidPair();
    }
    if (isAdjacent) {
      return this.validPair();
    }

    if (isSameRow) {
      if (this.isEmptyCells(this.cells, 1)) {
        return this.validPair();
      }

      return this.invalidPair();
    }

    if (isSameCol) {
      if (this.isEmptyCells(this.cells, 9)) {
        return this.validPair();
      }

      return this.invalidPair();
    }

    return this.invalidPair();
  }

  isEmptyCells(cells, step) {
    const minCol = Math.min(this.cell1.id, this.cell2.id);
    const maxCol = Math.max(this.cell1.id, this.cell2.id);

    for (let i = minCol + step; i < maxCol; i += step) {
      const nextCol = cells[i];
      if (nextCol.matched === false) {
        return false;
      }
    }
    return true;
  }

  validPair() {
    this.cell1.match();
    this.cell2.match();

    setTimeout(() => {
      this.cell1.hide();
      this.cell2.hide();
    }, 300);

    return true;
  }

  invalidPair() {
    this.cell1.deselect();
    this.cell2.deselect();

    return false;
  }
}
