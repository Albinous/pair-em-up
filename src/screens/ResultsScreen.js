import { createElement } from '@/utils/dom';

export class ResultsScreen {
  constructor() {}

  render() {
    const container = createElement('main', {
      classes: ['results-screen'],
    });

    const title = this.createTitle();

    container.append(title);

    return container;
  }

  createTitle() {
    return createElement('h1', {
      classes: ['main-title'],
      text: `Results`,
    });
  }

  destroy() {}
}
