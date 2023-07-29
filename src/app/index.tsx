import { render } from 'preact';
import { App } from './App';

export default function renderApp(container: HTMLElement) {
  render(<App />, container);
}
