import appState from './signals/appState';
import SubmitWidget from './widgets/SubmitWidget';

export function App() {
  const state = appState.value;

  switch (state) {
    case 'submit':
      return (
        <div class="fixed top-2 right-2 z-50">
          <section class="sticky py-4 px-8 border rounded-md bg-white">
            <SubmitWidget />
          </section>
        </div>
      );
    default:
      return null;
  }
}
