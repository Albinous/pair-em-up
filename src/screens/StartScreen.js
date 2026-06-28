import { Button } from '@/components/Button';
import { createElement } from '@/utils/dom';

export class StartScreen {
  constructor() {}

  render() {
    const container = createElement('main', { classes: ['main'] });
    const title = createElement('h1', {
      classes: ['main-title'],
      text: `Pair 'em Up`,
    });
    const btnClassic = new Button({
      classes: ['mode-classic__btn', 'btn'],
      text: 'Classic',
    }).render();
    const btnRandom = new Button({
      classes: ['mode-random__btn', 'btn'],
      text: 'Random',
    }).render();
    const btnChaotic = new Button({
      classes: ['mode-chaotic__btn', 'btn'],
      text: 'Chaotic',
    }).render();
    container.append(title, btnClassic, btnRandom, btnChaotic);
    return container;
  }
}
