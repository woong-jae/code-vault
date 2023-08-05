import appState, { AppState } from './signals/appState';
import SettingWidget from './widgets/SettingWidget';
import SubmitWidget from './widgets/SubmitWidget';

function renderWidget(appState: AppState) {
  switch (appState) {
    case 'submit':
      return <SubmitWidget />;
    case 'setting':
      return <SettingWidget />;
    default:
      return null;
  }
}

export function App() {
  const state = appState.value;

  return state ? (
    <div class="fixed top-5 right-5 z-50">
      <section class="sticky py-4 px-8 border rounded-md bg-white">
        {renderWidget(state)}
      </section>
    </div>
  ) : null;
}
