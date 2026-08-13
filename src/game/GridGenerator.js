import { randomInt, shuffle } from '@/utils/random';

export class GridGenerator {
  generateClassicNumbers(start = 1, end = 19) {
    let numbers = [];

    for (let i = start; i <= end; i++) {
      if (i % 10 !== 0) {
        String(i)
          .split('')
          .forEach((n) => numbers.push(+n));
      }
    }

    return numbers;
  }

  generateRandomNumbers() {
    const numbers = shuffle(this.generateClassicNumbers());

    return numbers;
  }

  generateChaoticNumbers() {
    return Array.from({ length: 27 }, () => randomInt(1, 9));
  }
}
