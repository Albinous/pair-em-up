import { Button } from '@/components/Button';
import { createElement } from '@/utils/dom';

export class StartScreen {
  constructor({ actions }) {
    this.actions = actions;
  }

  render() {
    const container = createElement('main', { classes: ['start-screen'] });
    const title = this.createTitle();
    const modeBtnsContainer = createElement('div', { classes: ['mode-btns'] });

    this.btnClassic = new Button({
      classes: ['mode-classic__btn', 'btn'],
      text: 'Classic',
    }).render();
    this.btnRandom = new Button({
      classes: ['mode-random__btn', 'btn'],
      text: 'Random',
    }).render();
    this.btnChaotic = new Button({
      classes: ['mode-chaotic__btn', 'btn'],
      text: 'Chaotic',
    }).render();

    modeBtnsContainer.append(this.btnClassic, this.btnRandom, this.btnChaotic);

    this.btnSettings = new Button({
      classes: ['settings-btn', 'btn'],
      text: 'Settings',
    }).render();
    this.btnResults = new Button({
      classes: ['results-btn', 'btn'],
      text: 'Results',
    }).render();
    container.append(title, modeBtnsContainer, this.btnSettings, this.btnResults);

    this.bindEvents();
    return container;
  }

  createTitle() {
    return createElement('h1', {
      classes: ['main-title'],
      text: `Pair 'em Up`,
    });
  }

  bindEvents() {
    this.btnClassic.addEventListener('click', () => {
      this.actions.classic();
    });
    this.btnRandom.addEventListener('click', () => {
      this.actions.random();
    });
    this.btnChaotic.addEventListener('click', () => {
      this.actions.chaotic();
    });
    this.btnSettings.addEventListener('click', () => {
      this.actions.settings();
    });
    this.btnResults.addEventListener('click', () => {
      this.actions.results();
    });
  }

  destroy() {}
}
