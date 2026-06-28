import { createElement } from '@/utils/dom';

export class Button {
  constructor({ className, text }) {
    this.className = className;
    this.text = text;
    this.element = null;
  }

  render() {
    this.element = createElement('button', {
      className: this.className,
      text: this.text,
    });
    return this.element;
  }
}
