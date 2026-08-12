import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { createElement } from '@/utils/dom';
import { defaultSettings } from '@/storage/settings';

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

    this.loadTheme();
    this.applyTheme();

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
      classes: ['theme-btn'],
      text: 'Light',
      attrs: {
        'data-theme': 'light',
      },
    }).render();

    const themeDarkBtn = new Button({
      classes: ['theme-btn'],
      text: 'Dark',
      attrs: {
        'data-theme': 'dark',
      },
    }).render();

    theme.append(themeLightBtn, themeDarkBtn);

    return theme;
  }

  settingsValues() {
    const settingsStorage = this.storage.get('settings');
    if (settingsStorage) {
      return settingsStorage;
    }

    this.saveSettings(defaultSettings);
    return defaultSettings;
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
    this.settings.theme = themeBtn.dataset.theme;

    const activeBtn = this.settingsContainer.querySelector('.theme-btn__active');
    if (activeBtn) activeBtn.classList.remove('theme-btn__active');

    themeBtn.classList.add('theme-btn__active');
    this.saveSettings(this.settings);
    this.applyTheme();
  }

  loadTheme() {
    const themeBtn = this.settingsContainer.querySelector(`[data-theme=${this.settings.theme}]`);
    const activeThemeBtn = this.settingsContainer.querySelector('.theme-btn__active');

    if (activeThemeBtn) activeThemeBtn.classList.remove('theme-btn__active');

    if (themeBtn) themeBtn.classList.add('theme-btn__active');
  }

  applyTheme() {
    document.body.dataset.theme = this.settings.theme;
  }

  bindEvents() {
    this.settingsContainer.addEventListener('click', (event) => {
      this.handleToggleClick(event);
      this.handleThemeClick(event);
    });
  }

  destroy() {}
}
