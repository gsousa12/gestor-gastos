import { useState, useRef } from "react";

interface ComboBoxProps {
  label: string;
  options: { id: number; name: string }[];
  value: number | undefined;
  onChange: (id: number) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}

export const ComboBox = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  icon,
}: ComboBoxProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selected = options.find((opt) => opt.id === value);

  const filtered = query
    ? options.filter((opt) =>
        opt.name.toLowerCase().includes(query.toLowerCase())
      )
    : options;

  const displayValue = isOpen ? query : selected?.name || "";

  return (
    <div className="relative">
      <label className="flex items-center text-sm font-semibold text-sky-700 mb-1 gap-1">
        {icon}
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          className="w-full px-4 py-2 border border-sky-100 rounded-lg text-sm focus:ring-2 focus:ring-sky-300 outline-none bg-sky-50 transition"
          placeholder={placeholder}
          value={displayValue}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setIsOpen(true);
            setQuery("");
          }}
          onBlur={() => {
            setTimeout(() => setIsOpen(false), 100);
            setQuery("");
          }}
          autoComplete="off"
        />
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute left-0 right-0 z-10 bg-white rounded-lg shadow-lg max-h-40 overflow-y-auto border border-sky-100 mt-1">
          {filtered.length === 0 && (
            <div className="px-4 py-2 text-sky-400 text-xs">
              Nenhum resultado
            </div>
          )}
          {filtered.map((opt) => (
            <div
              key={opt.id}
              className={`px-4 py-2 cursor-pointer hover:bg-sky-100 text-sm rounded ${
                value === opt.id ? "bg-sky-100 text-sky-900" : ""
              }`}
              onMouseDown={() => {
                onChange(opt.id);
                setIsOpen(false);
                setQuery("");
              }}
            >
              {opt.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
