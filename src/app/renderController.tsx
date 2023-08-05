import { render } from 'preact';
import Controller from './widgets/Controller';
import './index.css';

export default function renderController() {
  const container = document.createElement('div');
  document.body.append(container);
  render(<Controller />, container);
}
