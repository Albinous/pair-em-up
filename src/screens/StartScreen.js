import { Button } from '@/components/Button';
import { createElement } from '@/utils/dom';
import githubIcon from '@/assets/icons/github.svg';

export class StartScreen {
  constructor({ actions }) {
    this.actions = actions;
  }

  render() {
    const container = createElement('main', { classes: ['start-screen'] });
    const title = this.createTitle();
    const modeBtns = this.createModeBtns();
    const secondaryBtns = this.createSecondaryBtns();
    const author = this.createAuthor();

    this.buttons = {
      ...modeBtns.buttons,
      ...secondaryBtns.buttons,
    };

    container.append(title, modeBtns.container, secondaryBtns.container, author);

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
      classes: ['btn', `${className}__btn`],
      text,
    }).render();
  }

  createModeBtns() {
    const container = createElement('div', { classes: ['start-screen__buttons'] });

    const buttons = {
      classic: this.createBtn('mode-classic', 'Classic'),
      random: this.createBtn('mode-random', 'Random'),
      chaotic: this.createBtn('mode-chaotic', 'Chaotic'),
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
      settings: this.createBtn('secondary', 'Settings'),
      results: this.createBtn('secondary', 'Results'),
    };

    container.append(...Object.values(buttons));

    return {
      container,
      buttons,
    };
  }

  createAuthor() {
    const author = createElement('div', { classes: ['start-screen__author'], text: 'By ' });
    const authorLink = createElement('a', {
      classes: ['start-screen__author-link'],
      attrs: {
        href: 'https://github.com/Albinous',
        target: '_blank',
      },
    });
    const authorGithubIcon = createElement('img', {
      classes: ['start-screen__author-github'],
      attrs: {
        src: githubIcon,
      },
    });

    const authourLinkText = createElement('span', {
      text: 'Albinous',
    });

    authorLink.append(authorGithubIcon, authourLinkText);
    author.append(authorLink);

    return author;
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
