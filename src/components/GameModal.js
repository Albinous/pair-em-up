import { createElement } from '@/utils/dom';

export class GameModal {
  constructor() {
    this.element = null;
    this.title = '';
    this.stats = [];
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
    // this.stats = createElement('div', {
    //   classes: ['modal-stats'],
    // });
    this.element.append(overlay, this.content);

    return this.element;
  }

  showTime() {}

  show() {
    this.content.innerHTML = '';
    const titleValue = `You ${this.title}`;
    const title = createElement('h1', {
      classes: ['modal-title'],
      text: titleValue,
    });

    this.content.append(title);
    const containerStats = createElement('div', {
      classes: ['modal-stats'],
    });
    this.stats.forEach((stat) => {
      const container = createElement('div', {
        classes: ['modal-stat'],
      });
      const statTitle = createElement('span', {
        text: `${stat.title}: `,
      });
      const valueSpan = createElement('span', {
        text: `${stat.value}`,
      });

      container.append(statTitle, valueSpan);
      containerStats.append(container);
    });
    // this.stats.append(containerStats);
    this.content.append(containerStats);

    this.element.classList.add('show');
  }

  hide() {
    this.element.classList.remove('show');
  }

  setData(title, stats) {
    this.title = title;
    this.stats = stats;
  }
}
