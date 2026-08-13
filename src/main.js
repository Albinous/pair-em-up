import '@/styles/main.scss';
import { App } from './App';

const root = document.createElement('div');
root.id = 'app';

document.body.prepend(root);

const app = new App(root);

app.init();
