import { Button } from '@/components/Button';
import { createElement } from '@/utils/dom';

export class StartScreen {
  constructor() {}

  render() {
    const container = createElement('main', { className: 'main' });
    const title = createElement('h1', {
      className: 'main-title',
      text: `Pair 'em Up`,
    });
    const btnClassic = new Button({
      className: 'mode-classic__btn',
      text: 'Classic',
    }).render();
    const btnRandom = new Button({
      className: 'mode-random__btn',
      text: 'Random',
    }).render();
    const btnChaotic = new Button({
      className: 'mode-chaotic__btn',
      text: 'Chaotic',
    }).render();
    container.append(title, btnClassic, btnRandom, btnChaotic);
    return container;
  }
}
