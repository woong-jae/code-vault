import { ComponentChildren } from 'preact';

export default function Card({ children }: { children: ComponentChildren }) {
  return (
    <section class="min-w-max rounded-md border bg-white px-4 py-4">
      {children}
    </section>
  );
}
