export class PairValidator {
  constructor(cell1, cell2) {
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

    if (!isSumTen && !isEqual) {
      return this.invalidPair();
    }
    if (!isAdjacent) {
      return this.invalidPair();
    }

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
