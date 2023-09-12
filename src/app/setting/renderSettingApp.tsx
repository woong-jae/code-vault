import { createRoot } from 'react-dom/client';
import SettingApp from './App';
import '../style.css';

export function renderSettingApp() {
  const $app = document.getElementById('app');
  if (!$app) {
    throw new Error('No element with "id=app"');
  }
  const root = createRoot($app);
  root.render(<SettingApp />);
}
