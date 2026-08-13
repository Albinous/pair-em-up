import { createElement } from '@/utils/dom';

export class GameStat {
  constructor({ title, value, suffix, classes }) {
    this.title = title;
    this.value = value;
    this.suffix = suffix;
    this.classes = classes;
    this.element = null;
  }

  render() {
    this.element = createElement('div', { classes: [this.classes] });
    const title = createElement('h3', {
      classes: [`${this.classes}__title`],
      text: this.title,
    });
    this.valueElement = createElement('span', {
      classes: [`${this.classes}__number`],
      text: this.value,
    });

    if (this.suffix) {
      const suffix = createElement('span', {
        classes: [`${this.classes}__number`],
        text: this.suffix,
      });
      this.element.append(title, this.valueElement, suffix);
    } else {
      this.element.append(title, this.valueElement);
    }
    return this.element;
  }

  setValue(value) {
    this.value = value;
    this.valueElement.textContent = value;
  }
}
