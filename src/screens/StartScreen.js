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

    this.buttons = {
      classic: this.createModeBtn('classic', 'Classic'),
      random: this.createModeBtn('random', 'Random'),
      chaotic: this.createModeBtn('chaotic', 'Chaotic'),
    };

    modeBtnsContainer.append(...Object.values(this.buttons));

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

  createModeBtn(className, text) {
    return new Button({
      classes: [`mode-${className}__btn`, 'btn'],
      text: `${text}`,
    }).render();
  }

  bindEvents() {
    this.buttons.classic.addEventListener('click', () => {
      this.actions.classic();
    });
    this.buttons.random.addEventListener('click', () => {
      this.actions.random();
    });
    this.buttons.chaotic.addEventListener('click', () => {
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
