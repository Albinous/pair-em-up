import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { createElement } from '@/utils/dom';

export class SettingsScreen {
  constructor(title, { actions }) {
    this.title = title;
    this.actions = actions;
  }

  render() {
    const container = createElement('main', {
      classes: ['settings-screen', 'container'],
    });

    const header = new Header({ title: this.title, start: this.actions.start }).render();
    const audio = this.createAudioSection();

    container.append(header, audio);

    this.bindEvents();

    return container;
  }

  createAudioSection() {
    const container = createElement('div', {
      classes: ['settings-section'],
    });

    const subtitle = createElement('h2', {
      classes: ['settings-subtitle'],
      text: 'Audio',
    });

    container.append(subtitle);

    const settings = this.settingsValues();
    settings.audio.forEach((audio) => {
      container.append(this.createAudioOption(audio));
    });

    return container;
  }

  createAudioOption(audio) {
    const container = createElement('div', {
      classes: ['settings-option'],
    });

    const span = createElement('span', {
      text: audio.title,
    });

    const btn = new Button({
      classes: ['toggle', ...(audio.enabled ? ['toggle-active'] : [])],
    }).render();

    const spanCircle = createElement('span', {
      classes: ['toggle-circle'],
    });

    btn.append(spanCircle);
    container.append(span, btn);

    return container;
  }

  settingsValues() {
    const settings = {
      audio: [
        {
          key: 'selection',
          title: 'Cell selection / deselection',
          enabled: true,
        },
        {
          key: 'success',
          title: 'Successful pair matching',
          enabled: true,
        },
        {
          key: 'failure',
          title: 'Invalid pair attempts',
          enabled: true,
        },
        {
          key: 'assist',
          title: 'Assist tool usage',
          enabled: true,
        },
        {
          key: 'game',
          title: 'Game start and end',
          enabled: true,
        },
      ],

      theme: 'light',
    };

    return settings;
  }

  bindEvents() {}

  destroy() {}
}
