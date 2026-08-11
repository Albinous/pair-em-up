import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { createElement } from '@/utils/dom';

export class SettingsScreen {
  constructor(title, { actions, storage }) {
    this.title = title;
    this.actions = actions;
    this.storage = storage;
    this.settings = this.settingsValues();
  }

  render() {
    this.settingsContainer = createElement('main', {
      classes: ['settings-screen', 'container'],
    });

    const header = new Header({ title: this.title, start: this.actions.start }).render();
    const audio = this.createAudioSection();
    const theme = this.createThemeSection();

    this.settingsContainer.append(header, audio, theme);

    this.bindEvents();

    return this.settingsContainer;
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
    this.settings.audio.forEach((audio) => {
      container.append(this.createAudioOption(audio));
    });

    return container;
  }

  createThemeSection() {
    const container = createElement('div', {
      classes: ['settings-section'],
    });

    const subtitle = createElement('h2', {
      classes: ['settings-subtitle'],
      text: 'Theme',
    });

    const theme = this.createTheme();

    container.append(subtitle, theme);

    return container;
  }

  createTheme() {
    const theme = createElement('div', {
      classes: ['theme'],
    });

    const themeLightBtn = new Button({
      classes: ['theme-btn', 'theme-btn__active'],
      text: 'Light',
    }).render();

    const themeDarkBtn = new Button({
      classes: ['theme-btn'],
      text: 'Dark',
    }).render();

    theme.append(themeLightBtn, themeDarkBtn);

    return theme;
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
      attrs: {
        'data-key': audio.key,
      },
    }).render();

    const spanCircle = createElement('span', {
      classes: ['toggle-circle'],
    });

    btn.append(spanCircle);
    container.append(span, btn);

    return container;
  }

  settingsValues() {
    const settingsStorage = this.storage.get('settings');
    if (settingsStorage) {
      return settingsStorage;
    }
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

    this.saveSettings(settings);
    return settings;
  }

  saveSettings(settings) {
    this.storage.set('settings', settings);
  }

  handleToggleClick(event) {
    const toggleBtn = event.target.closest('.toggle');
    if (!toggleBtn) return;

    const key = toggleBtn.dataset.key;
    const audioObj = this.settings.audio.find((setting) => setting.key === key);
    audioObj.enabled = !audioObj.enabled;
    this.saveSettings(this.settings);
    toggleBtn.classList.toggle('toggle-active');
  }

  handleThemeClick(event) {
    const themeBtn = event.target.closest('.theme-btn');
    if (!themeBtn) return;
    this.settings.theme = themeBtn.textContent.toLowerCase();

    const activeBtn = this.settingsContainer.querySelector('.theme-btn__active');
    if (activeBtn) activeBtn.classList.remove('theme-btn__active');

    themeBtn.classList.add('theme-btn__active');
    this.saveSettings(this.settings);
  }

  bindEvents() {
    this.settingsContainer.addEventListener('click', (event) => {
      this.handleToggleClick(event);
      this.handleThemeClick(event);
    });
  }

  destroy() {}
}
