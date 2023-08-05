import { ComponentChildren } from 'preact';

export default function Card({ children }: { children: ComponentChildren }) {
  return (
    <section class="rounded-md border bg-white px-8 py-4">{children}</section>
  );
}
