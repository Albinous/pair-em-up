import { createElement } from '@/utils/dom';

export class Cell {
  constructor(value) {
    this.value = value;
  }

  render() {
    const cell = createElement('div', {
      classes: ['game-grid__cell'],
      text: this.value,
    });

    return cell;
  }
}
