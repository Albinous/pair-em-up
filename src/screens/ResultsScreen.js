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

    const highScore = this.createHighScore();

    results.append(statistics, highScore);

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
      classes: ['results-title'],
      text: 'Statistics',
    });

    const resultsHeader = this.createResultsHeader();

    const history = this.history.getHistory();
    const container = createElement('div', {
      classes: ['results-row'],
    });
    const lastResult = history[history.length - 1];
    for (let value in lastResult) {
      container.append(
        createElement('span', {
          text: lastResult[value],
        })
      );
    }

    statistics.append(statisticsTitle, resultsHeader, container);

    return statistics;
  }

  createHighScore() {
    const container = createElement('div', {
      classes: ['results-high'],
    });

    const title = createElement('h2', {
      classes: ['results-title'],
      text: 'High Score',
    });

    const resultsHeader = this.createResultsHeader();

    const resultsBody = createElement('div', {
      classes: ['results-body'],
    });
    this.createResultsValue(resultsBody);

    container.append(title, resultsHeader, resultsBody);

    return container;
  }

  createResultsItem(title) {
    const span = createElement('span', {
      classes: ['results-item'],
      text: title,
    });

    return span;
  }

  createResultsValue(row) {
    const latestGames = this.history.getHistory().slice(-5);
    const highScoreGames = latestGames
      .filter((obj) => obj.outcome === 'Win')
      .sort((a, b) => this.parseTime(a.time) - this.parseTime(b.time));
    highScoreGames.forEach((obj) => {
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

  parseTime(time) {
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
  }

  bindEvents() {}

  destroy() {}
}
