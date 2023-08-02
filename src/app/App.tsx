import SubmitWidget from './widgets/Submit';

export function App() {
  return (
    <div class="fixed top-2 right-2 z-50">
      <section class="sticky py-4 px-8 border rounded-md bg-white">
        <SubmitWidget />
      </section>
    </div>
  );
}
