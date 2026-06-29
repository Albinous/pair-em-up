import { Button } from '@/components/Button';
import { createElement } from '@/utils/dom';

export class StartScreen {
  constructor({ actions }) {
    this.actions = actions;
  }

  render() {
    const container = createElement('main', { classes: ['start-screen'] });
    const title = this.createTitle();
    const modeBtns = this.createModeBtns();
    const secondaryBtns = this.createSecondaryBtns();

    this.buttons = {
      ...modeBtns.buttons,
      ...secondaryBtns.buttons,
    };

    container.append(title, modeBtns.container, secondaryBtns.container);

    this.bindEvents();
    return container;
  }

  createTitle() {
    return createElement('h1', {
      classes: ['start-screen__title'],
      text: `Pair 'em Up`,
    });
  }

  createBtn(className, text) {
    return new Button({
      classes: [`${className}__btn`, 'btn'],
      text,
    }).render();
  }

  createModeBtns() {
    const container = createElement('div', { classes: ['start-screen__buttons'] });

    const buttons = {
      classic: this.createBtn('start-screen__classic', 'Classic'),
      random: this.createBtn('start-screen__random', 'Random'),
      chaotic: this.createBtn('start-screen__chaotic', 'Chaotic'),
    };

    container.append(...Object.values(buttons));

    return {
      container,
      buttons,
    };
  }

  createSecondaryBtns() {
    const container = createElement('div', { classes: ['start-screen__secondary'] });
    const buttons = {
      settings: this.createBtn('settings', 'Settings'),
      results: this.createBtn('results', 'Results'),
    };

    container.append(...Object.values(buttons));

    return {
      container,
      buttons,
    };
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
    this.buttons.settings.addEventListener('click', () => {
      this.actions.settings();
    });
    this.buttons.results.addEventListener('click', () => {
      this.actions.results();
    });
  }

  destroy() {}
}
