import { ChangeEvent, useState } from 'preact/compat';

type SelectItem = {
  value: string;
  content: string;
};

export default function Select({
  initialSelected,
  items,
  onChange,
}: {
  initialSelected?: SelectItem;
  items: SelectItem[];
  onChange: (changedValue: string) => void;
}) {
  const [selected, setSelected] = useState<SelectItem | undefined>(
    initialSelected,
  );

  function handleChange({ currentTarget }: ChangeEvent<HTMLSelectElement>) {
    setSelected(items.find(item => item.value === currentTarget.value));
    onChange(currentTarget.value);
  }

  return (
    <div class="relative flex items-center">
      <select
        class="appearance-none rounded-md border bg-transparent py-1 pl-2 pr-6 selection:appearance-none"
        value={selected?.value ?? ''}
        onChange={handleChange}
      >
        <option value="">없음</option>
        {items.map(item => (
          <option value={item.value}>{item.content}</option>
        ))}
      </select>
      <svg
        class="absolute right-2"
        width="16px"
        height="16px"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 4a1 1 0 0 1 .707.293l4 4a1 1 0 0 1-1.414 1.414L12 6.414 8.707 9.707a1 1 0 0 1-1.414-1.414l4-4A1 1 0 0 1 12 4zM7.293 14.293a1 1 0 0 1 1.414 0L12 17.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
          fill="#0D0D0D"
        />
      </svg>
    </div>
  );
}
