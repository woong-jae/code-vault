import renderApp from '.';
import { setAppState } from './signals/appState';

renderApp();

setAppState('submit');