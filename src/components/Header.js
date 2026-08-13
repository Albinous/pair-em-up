import { createElement } from '@/utils/dom';
import { Button } from './Button';

export class Header {
  constructor({ title, start }) {
    this.title = title;
    this.start = start;
  }

  render() {
    const header = createElement('header', {
      classes: ['header'],
    });
    this.backBtn = new Button({ classes: ['back-btn', 'btn'], text: 'Back' }).render();
    const title = createElement('h1', {
      classes: ['header-title'],
      text: `${this.title[0].toUpperCase()}${this.title.slice(1)}`,
    });

    header.append(this.backBtn, title);

    this.bindEvents();

    return header;
  }

  bindEvents() {
    this.backBtn.addEventListener('click', () => {
      this.start();
    });
  }
}
