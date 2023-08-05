type ButtonColor = 'green' | 'gray';

export function Button({
  color = 'green',
  content,
  onClick,
}: {
  color?: ButtonColor;
  content: string;
  onClick: () => void;
}) {
  return (
    <button
      class={`min-w-full py-1 px-4 rounded-md font-medium bg-${color}-600 hover:brightness-90 text-white`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
