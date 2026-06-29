import { Button } from '@/components/Button';
import { createElement } from '@/utils/dom';

export class ResultsScreen {
  constructor({ start }) {
    this.start = start;
  }

  render() {
    const container = createElement('main', {
      classes: ['results-screen'],
    });

    this.backBtn = new Button({
      classes: ['back-btn', 'btn'],
      text: 'Back',
    }).render();

    const title = this.createTitle();

    container.append(title, this.backBtn);

    return container;
  }

  createTitle() {
    return createElement('h1', {
      classes: ['main-title'],
      text: `Results`,
    });
  }

  bindEvents() {
    this.backBtn.addEventListener('click', () => {
      this.start();
    });
  }

  destroy() {}
}
