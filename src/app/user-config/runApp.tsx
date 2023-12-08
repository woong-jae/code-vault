import { createRoot } from 'react-dom/client';
import App from './App';
import '../index.css';

export function runApp() {
  const $app = document.getElementById('app');
  if (!$app) {
    throw new Error('No element with "id=app"');
  }
  const root = createRoot($app);
  root.render(<App />);
}
