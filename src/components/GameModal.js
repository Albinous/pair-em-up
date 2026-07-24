import { createElement } from '@/utils/dom';
import { Button } from './Button';

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
    this.element.append(overlay, this.content);

    return this.element;
  }

  show() {
    this.content.innerHTML = '';
    this.renderTitle();
    this.renderStats();
    this.renderButtons();

    this.element.classList.add('show');
  }

  renderTitle() {
    const titleValue = `You ${this.title}`;
    const title = createElement('h1', {
      classes: ['modal-title'],
      text: titleValue,
    });

    this.content.append(title);
  }

  renderStats() {
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
    this.content.append(containerStats);
  }

  createBtn(text) {
    return new Button({
      classes: ['modal-btn'],
      text,
    }).render();
  }

  renderButtons() {
    const container = createElement('div', {
      classes: ['modal-btns'],
    });
    this.buttons = {
      reset: this.createBtn('Play Again'),
      menu: this.createBtn('Main menu'),
      results: this.createBtn('Results'),
    };
    container.append(...Object.values(this.buttons));
    this.content.append(container);
  }

  hide() {
    this.element.classList.remove('show');
  }

  setData(title, stats) {
    this.title = title;
    this.stats = stats;
  }
}
