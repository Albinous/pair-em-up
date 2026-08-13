import selectSound from '@/assets/sounds/select.mp3';
import errorSound from '@/assets/sounds/error.mp3';
import successSound from '@/assets/sounds/success.mp3';
import assistSound from '@/assets/sounds/assist.mp3';
import startSound from '@/assets/sounds/game-start.mp3';

export class SoundManager {
  constructor(storage) {
    this.sounds = {
      selection: new Audio(selectSound),
      failure: new Audio(errorSound),
      success: new Audio(successSound),
      assist: new Audio(assistSound),
      game: new Audio(startSound),
    };
    this.storage = storage;
  }

  playSound(name) {
    const settings = this.storage.get('settings');
    const settingsKey = settings.audio.find((setting) => setting.key === name);
    const sound = this.sounds[name];
    if (!sound) return;
    sound.currentTime = 0;
    if (settingsKey.enabled) {
      sound.play();
    }
  }
}
