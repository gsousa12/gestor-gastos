import { useState, useRef } from "react";

interface ComboBoxProps {
  label: string;
  options: { id: number; name: string }[];
  value: number | undefined;
  onChange: (id: number) => void;
  placeholder?: string;
}

export const ComboBox = ({
  label,
  options,
  value,
  onChange,
  placeholder,
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
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      <input
        ref={inputRef}
        className="w-full px-2 py-1 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-gray-400 outline-none mb-1"
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
      {isOpen && (
        <div className="absolute left-0 right-0 z-10 bg-gray-100 rounded shadow-sm max-h-40 overflow-y-auto border border-gray-200">
          {filtered.length === 0 && (
            <div className="px-2 py-1 text-gray-400 text-xs">
              Nenhum resultado
            </div>
          )}
          {filtered.map((opt) => (
            <div
              key={opt.id}
              className={`px-2 py-1 cursor-pointer hover:bg-gray-300 text-sm ${
                value === opt.id ? "bg-gray-300 text-gray-900" : ""
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
