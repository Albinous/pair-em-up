import { createElement } from '@/utils/dom';

export class GameModal {
  constructor() {
    this.element = null;
  }

  render() {
    this.element = createElement('div', {
      classes: ['modal'],
    });

    const overlay = createElement('div', {
      classes: ['modal-overlay'],
    });
    this.content = createElement('div', {
      classes: ['modal-content'],
    });

    this.element.append(overlay, this.content);

    return this.element;
  }

  showTitle(type) {
    const titleValue = `You ${type}`;
    const title = createElement('h1', {
      classes: ['modal-title'],
      text: titleValue,
    });

    this.content.append(title);
  }

  showScore() {}

  showTime() {}

  show() {
    this.element.classList.add('show');
  }

  hide() {
    this.element.classList.remove('show');
  }
}
