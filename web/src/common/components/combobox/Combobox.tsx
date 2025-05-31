import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

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
  const [query, setQuery] = React.useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((opt) =>
          opt.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="w-full">
      <label className="flex items-center text-sm font-semibold text-sky-700 mb-1 gap-1">
        {icon}
        {label}
      </label>
      <Combobox value={value} onChange={onChange}>
        <div className="relative">
          <ComboboxInput
            className="w-full px-4 py-2 border border-sky-100 rounded-lg text-sm bg-sky-50 focus:ring-2 focus:ring-sky-300 outline-none transition"
            displayValue={(id: number) =>
              options.find((opt) => opt.id === id)?.name || ""
            }
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder || "Selecione"}
            autoComplete="off"
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronsUpDown className="h-5 w-5 text-sky-400" />
          </ComboboxButton>
          <ComboboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredOptions.length === 0 ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-400">
                Nenhum resultado
              </div>
            ) : (
              filteredOptions.map((opt) => (
                <ComboboxOption
                  key={opt.id}
                  value={opt.id}
                  className={({ active, selected }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-sky-100 text-sky-900" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {opt.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-sky-600" : "text-sky-600"
                          }`}
                        >
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
};
