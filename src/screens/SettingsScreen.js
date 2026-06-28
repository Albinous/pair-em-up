import { createElement } from '@/utils/dom';

export class SettingsScreen {
  constructor() {}

  render() {
    const container = createElement('main', {
      classes: ['settings-screen'],
    });

    const title = this.createTitle();

    container.append(title);

    return container;
  }

  createTitle() {
    return createElement('h1', {
      classes: ['main-title'],
      text: `Settings`,
    });
  }

  destroy() {}
}
