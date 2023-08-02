import { signal } from '@preact/signals';

type AppState = 'submit' | 'login';

const appState = signal<AppState | null>(null);

export function closeApp() {
  appState.value = null;
}

export function setAppState(newState: AppState) {
  appState.value = newState;
}

export default appState;
