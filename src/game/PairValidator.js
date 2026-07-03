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
      if (this.isEmptyCells(this.cells, 1, this.leftCell(), this.rightCell())) {
        return this.validPair();
      }

      return this.invalidPair();
    }

    if (isSameCol) {
      if (this.isEmptyCells(this.cells, 9, this.leftCell(), this.rightCell())) {
        return this.validPair();
      }

      return this.invalidPair();
    }

    if (this.isRowBoundary()) {
      return this.validPair();
    }

    return this.invalidPair();
  }

  isEmptyCells(cells, step, start, end) {
    for (let i = start + step; i < end; i += step) {
      const nextCell = cells[i];
      if (!nextCell.matched) {
        return false;
      }
    }
    return true;
  }

  isRowBoundary() {
    const endRow = (Math.min(this.cell1.row, this.cell2.row) + 1) * 9;
    const startRow = (Math.max(this.cell1.row, this.cell2.row) + 1) * 8;
    const leftId = this.leftCell();
    const rightId = this.rightCell();
    const lastNumberOfRow = this.isEmptyCells(this.cells, 1, leftId, endRow);
    const firstNumberOfRow = this.isEmptyCells(this.cells, 1, startRow, rightId);

    return lastNumberOfRow && firstNumberOfRow;
  }

  leftCell() {
    return Math.min(this.cell1.id, this.cell2.id);
  }

  rightCell() {
    return Math.max(this.cell1.id, this.cell2.id);
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
