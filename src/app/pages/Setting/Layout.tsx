import { ComponentChildren } from 'preact';
import Card from '~/app/components/Card';

export default function Layout({ children }: { children: ComponentChildren }) {
  return (
    <div class="flex min-h-screen min-w-fit items-center justify-center">
      <Card>
        <header class="mb-4 w-96 text-base font-medium">code-vault</header>
        {children}
      </Card>
    </div>
  );
}
