export function Button({
  content,
  onClick,
}: {
  content: string;
  onClick: () => void;
}) {
  return (
    <button
      class="min-w-full rounded-md bg-green-600 px-4 py-2 font-medium text-white hover:brightness-90"
      onClick={onClick}
    >
      {content}
    </button>
  );
}
