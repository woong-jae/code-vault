import { signal } from '@preact/signals';

export type AppState = 'submit' | 'setting';

const appState = signal<AppState | null>(null);

export function closeApp() {
  appState.value = null;
}

export function setAppState(newState: AppState) {
  appState.value = newState;
}

export default appState;
