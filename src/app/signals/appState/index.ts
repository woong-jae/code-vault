import { signal } from '@preact/signals';

export type AppState = 'loading' | 'login' | 'setting';

const appState = signal<AppState>('loading');

export function setAppState(newState: AppState) {
  appState.value = newState;
}

export default appState;
