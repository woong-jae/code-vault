import appState, { AppState } from '../../signals/appState';
import SettingWidget from './SettingWidget';
import SubmitWidget from './SubmitWidget';

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

export default function Controller() {
  const state = appState.value;

  return state ? (
    <div class="fixed right-4 top-4 z-50">
      <section class="sticky rounded-md border bg-white px-8 py-4">
        {renderWidget(state)}
      </section>
    </div>
  ) : null;
}
