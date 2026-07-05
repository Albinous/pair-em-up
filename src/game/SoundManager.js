export class SoundManager {
  constructor() {
    this.sounds = {
      click: new Audio('assets/sounds/select.mp3'),
      error: new Audio('assets/sounds/error.mp3'),
      success: new Audio('assets/sounds/success.mp3'),
      win: new Audio('assets/sounds/win.mp3'),
      over: new Audio('assets/sounds/game-over.mp3'),
    };
  }

  playSound(name) {
    const sound = this.sounds[name];
    if (!sound) return;
    sound.currentTime = 0;
    sound.play();
  }
}
