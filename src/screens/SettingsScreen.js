import { Button } from '@/components/Button';
import { createElement } from '@/utils/dom';

export class SettingsScreen {
  constructor({ start }) {
    this.start = start;
  }

  render() {
    const container = createElement('main', {
      classes: ['settings-screen'],
    });

    const title = this.createTitle();

    this.backBtn = new Button({
      classes: ['back-btn', 'btn'],
      text: 'Back',
    }).render();

    container.append(title, this.backBtn);

    this.bindEvents();

    return container;
  }

  createTitle() {
    return createElement('h1', {
      classes: ['main-title'],
      text: `Settings`,
    });
  }

  bindEvents() {
    this.backBtn.addEventListener('click', () => {
      this.start();
    });
  }

  destroy() {}
}
