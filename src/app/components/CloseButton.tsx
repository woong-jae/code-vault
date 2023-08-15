export default function CloseButton() {
  return (
    <button class="absolute right-3 top-3">
      <svg
        width="16px"
        height="16px"
        viewBox="-0.5 0 25 25"
        class="stroke-neutral-800 hover:stroke-neutral-500"
      >
        <path
          d="M3 21.32L21 3.32001"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3 3.32001L21 21.32"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
}
