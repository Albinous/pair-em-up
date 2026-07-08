export class PairValidator {
  constructor(cells, cell1, cell2) {
    this.cells = cells;
    this.cell1 = cell1;
    this.cell2 = cell2;
  }
  checkPair() {
    const isFivePlus = this.cell1.value === 5 && this.cell2.value === 5;
    const isSumTen = this.cell1.value + this.cell2.value === 10;
    const isEqual = this.cell1.value === this.cell2.value;

    const pairType = isFivePlus ? 'fivePlus' : isSumTen ? 'sumTen' : isEqual ? 'equal' : null;

    if (!pairType) {
      return null;
    }

    if (!this.canConnect()) {
      return null;
    }
    return pairType;
  }

  canConnect() {
    const rowDistance = Math.abs(this.cell2.row - this.cell1.row);
    const colDistance = Math.abs(this.cell2.col - this.cell1.col);
    const isAdjacentVertical = this.cell1.col === this.cell2.col && rowDistance === 1;
    const isAdjacentHorizontal = this.cell1.row === this.cell2.row && colDistance === 1;
    const isAdjacent = isAdjacentVertical || isAdjacentHorizontal;

    const isSameRow = this.cell1.row === this.cell2.row && colDistance !== 1;
    const isSameCol = this.cell1.col === this.cell2.col && rowDistance !== 1;

    return (
      isAdjacent ||
      (isSameRow && this.isConnected(1)) ||
      (isSameCol && this.isConnected(9)) ||
      this.isRowBoundary()
    );
  }

  isEmptyCells(step, start, end) {
    for (let i = start + step; i < end; i += step) {
      const nextCell = this.cells[i];
      if (!nextCell.matched) {
        return false;
      }
    }
    return true;
  }

  isConnected(step) {
    return this.isEmptyCells(step, this.leftCell(), this.rightCell());
  }

  isRowBoundary() {
    const endRow = (Math.min(this.cell1.row, this.cell2.row) + 1) * 9;
    const startRow = Math.max(this.cell1.row, this.cell2.row) * 9 - 1;
    const leftId = this.leftCell();
    const rightId = this.rightCell();
    const lastNumberOfRow = this.isEmptyCells(1, leftId, endRow);
    const firstNumberOfRow = this.isEmptyCells(1, startRow, rightId);
    if (lastNumberOfRow && firstNumberOfRow) {
      return this.isEmptyCells(1, endRow, startRow);
    }

    return false;
  }

  leftCell() {
    return Math.min(this.cell1.id, this.cell2.id);
  }

  rightCell() {
    return Math.max(this.cell1.id, this.cell2.id);
  }
}
