import { render } from 'preact';
import { App } from './App';
import './index.css';

export default function renderApp() {
  const container = document.createElement('div');
  document.body.append(container);
  render(<App />, container);
}
