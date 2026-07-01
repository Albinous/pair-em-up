export class PairValidator {
  constructor(cell1, cell2) {
    this.cell1 = cell1;
    this.cell2 = cell2;
  }
  checkPair() {
    if (this.cell1.value === this.cell2.value) {
      this.cell1.match();
      this.cell2.match();

      setTimeout(() => {
        this.cell1.hide();
        this.cell2.hide();
      }, 300);

      return true;
    }

    this.cell1.deselect();
    this.cell2.deselect();

    return false;
  }
}
