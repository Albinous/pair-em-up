export class StartScreen {
  constructor() {}

  render() {
    const container = document.createElement('main');
    container.classList.add('main');
    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = `Pair 'em Up`;
    const btnClassic = document.createElement('button');
    btnClassic.classList.add('mode-classic__btn');
    btnClassic.textContent = 'Classic';
    container.append(title, btnClassic);
    return container;
  }
}
