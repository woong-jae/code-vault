import appState from './signals/appState';
import SettingWidget from './widgets/SettingWidget';
import SubmitWidget from './widgets/SubmitWidget';

export function App() {
  const state = appState.value;

  switch (state) {
    case 'submit':
      return (
        <div class="fixed top-5 right-5 z-50">
          <section class="sticky py-4 px-8 border rounded-md bg-white">
            <SubmitWidget />
          </section>
        </div>
      );
    case 'setting':
      return (
        <div class="fixed top-5 right-5 z-50">
          <section class="sticky py-4 px-8 border rounded-md bg-white">
            <SettingWidget />
          </section>
        </div>
      );
    default:
      return null;
  }
}
