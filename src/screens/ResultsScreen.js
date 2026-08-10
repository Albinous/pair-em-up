import { Header } from '@/components/Header';
import { HistoryManager } from '@/game/HistoryManager';
import { createElement } from '@/utils/dom';

export class ResultsScreen {
  constructor(title, { actions }) {
    this.title = title;
    this.actions = actions;
    this.history = new HistoryManager();
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

    const statistics = this.createStatistics();

    const resultsHeader = this.createResultsHeader();

    const resultsBody = createElement('div', {
      classes: ['results-body'],
    });

    this.createResultsValue(resultsBody);

    results.append(statistics, resultsHeader, resultsBody);

    return results;
  }

  createResultsHeader() {
    const resultsHeader = createElement('div', {
      classes: ['results-header'],
    });

    const titles = ['Mode', 'Score', 'Time', 'Moves', 'Win/Loss'];
    const items = titles.map((title) => this.createResultsItem(title));
    resultsHeader.append(...items);

    return resultsHeader;
  }

  createStatistics() {
    const statistics = createElement('div', {
      classes: ['results-statistics'],
    });

    const statisticsTitle = createElement('h2', {
      classes: ['results-statistics__title'],
      text: 'Statistics',
    });

    const resultsHeader = this.createResultsHeader();

    const history = this.history.getHistory();
    const container = createElement('div', {
      classes: ['results-row'],
    });
    for (let value in history[0]) {
      container.append(
        createElement('span', {
          text: history[0][value],
        })
      );
    }

    statistics.append(statisticsTitle, resultsHeader, container);

    return statistics;
  }

  createResultsItem(title) {
    const span = createElement('span', {
      classes: ['results-item'],
      text: title,
    });

    return span;
  }

  createResultsValue(row) {
    const history = this.history.getHistory();
    history.forEach((obj) => {
      const container = createElement('div', {
        classes: ['results-row'],
      });
      for (let value in obj) {
        container.append(
          createElement('span', {
            text: obj[value],
          })
        );
      }
      row.append(container);
    });
  }

  bindEvents() {}

  destroy() {}
}
