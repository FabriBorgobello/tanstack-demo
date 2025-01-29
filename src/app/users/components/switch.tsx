export function Switch({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full
        ${value ? "bg-blue-600" : "bg-gray-300"}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition
          ${value ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
}
