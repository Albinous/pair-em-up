export class ScoreManager {
  constructor() {
    this.score = 0;
  }

  scoreCounter(pairType) {
    switch (pairType) {
      case 'fivePlus':
        this.score += 3;
        break;
      case 'sumTen':
        this.score += 2;
        break;
      case 'equal':
        this.score += 1;
        break;
    }

    return this.score;
  }
}
