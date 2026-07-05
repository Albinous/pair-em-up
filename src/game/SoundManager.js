import selectSound from '@/assets/sounds/select.mp3';
import errorSound from '@/assets/sounds/error.mp3';
import successSound from '@/assets/sounds/success.mp3';
import winSound from '@/assets/sounds/win.mp3';
import overSound from '@/assets/sounds/game-over.mp3';

export class SoundManager {
  constructor() {
    this.sounds = {
      click: new Audio(selectSound),
      error: new Audio(errorSound),
      success: new Audio(successSound),
      win: new Audio(winSound),
      over: new Audio(overSound),
    };
  }

  playSound(name) {
    const sound = this.sounds[name];
    if (!sound) return;
    sound.currentTime = 0;
    sound.play();
  }
}
