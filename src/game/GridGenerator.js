export class GridGenerator {
  generateClassicNumbers(start = 1, end = 40) {
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
}
