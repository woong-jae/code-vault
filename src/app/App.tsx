import { useState } from 'preact/hooks';
import './index.css';

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Vite + Preact</h1>
      <div class="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  );
}
