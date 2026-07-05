import { formatTime } from '@/utils/formatTime';

export class TimerManager {
  constructor() {
    this.startTime = 0;
    this.elapsedTime = 0;
    this.time = null;
  }
  start(timer) {
    this.startTime = Date.now() - this.elapsedTime;
    this.time = setInterval(() => this.update(timer), 1000);
  }

  stop() {
    clearInterval(this.time);
  }

  update(timer) {
    const currentTime = Date.now();
    this.elapsedTime = currentTime - this.startTime;

    let minutes = Math.floor((this.elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((this.elapsedTime / 1000) % 60);
    minutes = formatTime(minutes);
    seconds = formatTime(seconds);
    timer.setValue(`${minutes}:${seconds}`);
  }
}
