import renderController from './renderController';
import { setAppState } from './signals/appState';
import './renderSettingPage';

renderController();
setAppState('setting');
