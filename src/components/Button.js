import { createElement } from '@/utils/dom';

export class Button {
  constructor({ classes = [], text }) {
    this.classNames = classes;
    this.text = text;
    this.element = null;
  }

  render() {
    this.element = createElement('button', {
      classes: this.classNames,
      text: this.text,
    });
    return this.element;
  }
}
