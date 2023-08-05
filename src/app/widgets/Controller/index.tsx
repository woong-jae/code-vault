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
    <div class="fixed top-4 right-4 z-50">
      <section class="sticky py-4 px-8 border rounded-md bg-white">
        {renderWidget(state)}
      </section>
    </div>
  ) : null;
}
