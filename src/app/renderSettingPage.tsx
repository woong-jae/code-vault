import { render } from 'preact';
import SettingPage from './pages/SettingPage';
import './index.css';

const app = document.createElement('div');
app.id = 'app';
document.body.append(app);

render(<SettingPage />, app);
