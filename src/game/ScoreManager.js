export class ScoreManager {
  constructor() {
    this.score = 97;
  }

  addScore(pairType) {
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

  removeScore(pairType) {
    switch (pairType) {
      case 'fivePlus':
        this.score -= 3;
        break;
      case 'sumTen':
        this.score -= 2;
        break;
      case 'equal':
        this.score -= 1;
        break;
    }

    return this.score;
  }

  setScore(value) {
    this.score = Number(value);
  }
}
