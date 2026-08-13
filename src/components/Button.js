import { createElement } from '@/utils/dom';

export class Button {
  constructor({ classes = [], text, attrs = {} }) {
    this.classNames = classes;
    this.text = text;
    this.attrs = attrs;
    this.element = null;
  }

  render() {
    this.element = createElement('button', {
      classes: this.classNames,
      text: this.text,
      attrs: this.attrs,
    });
    return this.element;
  }
}
