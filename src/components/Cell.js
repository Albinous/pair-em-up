import { createElement } from '@/utils/dom';

export class Cell {
  constructor(id, value) {
    this.id = id;
    this.value = value;
    this.selected = false;
    this.matched = false;
    this.element = null;
  }

  render() {
    this.element = createElement('div', {
      classes: ['game-grid__cell'],
      text: this.value,
      attrs: {
        'data-id': this.id,
      },
    });

    return this.element;
  }

  select() {
    this.element.classList.add('selected');
    this.selected = true;
  }

  deselect() {
    this.element.classList.remove('selected');
    this.selected = false;
  }

  match() {
    this.element.classList.add('matched');
    this.matched = true;
  }
}
