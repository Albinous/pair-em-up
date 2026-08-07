import { Header } from '@/components/Header';
import { createElement } from '@/utils/dom';

export class ResultsScreen {
  constructor(title, { actions }) {
    this.title = title;
    this.actions = actions;
  }

  render() {
    const container = createElement('main', {
      classes: ['results-screen', 'container'],
    });
    const header = new Header({ title: this.title, start: this.actions.start }).render();
    const results = this.createResults();

    container.append(header, results);

    this.bindEvents();

    return container;
  }

  createResults() {
    const results = createElement('div', {
      classes: ['results'],
    });

    const resultsHeader = createElement('div', {
      classes: ['results-header'],
    });

    const titles = ['Mode', 'Score', 'Moves', 'Time', 'Date'];
    const items = titles.map((title) => this.createResultsItem(title));
    resultsHeader.append(...items);

    results.append(resultsHeader);

    return results;
  }

  createResultsItem(title) {
    const span = createElement('span', {
      classes: ['results-item'],
      text: title,
    });

    return span;
  }

  bindEvents() {}

  destroy() {}
}
