import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

interface ItemNameComboBoxProps {
  options: { id: number; name: string }[];
  value: { id: number | null; name: string };
  onChange: (value: { id: number | null; name: string }) => void;
  placeholder?: string;
  className?: string;
}

export const ItemNameComboBox: React.FC<ItemNameComboBoxProps> = ({
  options,
  value,
  onChange,
  placeholder,
  className,
}) => {
  // Estado local para o texto do input (controlado)
  const [inputValue, setInputValue] = React.useState(value.name || "");

  // Atualiza o inputValue se o valor externo mudar (ex: reset do form, troca de tab)
  React.useEffect(() => {
    setInputValue(value.name || "");
  }, [value.name]);

  // Filtra as opções pelo texto digitado
  const filteredOptions =
    inputValue === ""
      ? options
      : options.filter((opt) =>
          opt.name.toLowerCase().includes(inputValue.toLowerCase())
        );

  // Handler para seleção de opção do menu
  const handleSelect = (id: number) => {
    const selected = options.find((opt) => opt.id === id);
    if (selected) {
      setInputValue(selected.name);
      onChange({ id: selected.id, name: selected.name });
    }
  };

  // Handler para digitação livre
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    // Sempre que digitar, já salva no form como texto livre (id: null)
    onChange({ id: null, name: val });
  };

  // Handler para blur (perda de foco)
  const handleBlur = () => {
    // Ao perder o foco, garante que o valor digitado está salvo no form (id: null)
    if (
      !options.some(
        (opt) => opt.name.toLowerCase() === inputValue.trim().toLowerCase()
      )
    ) {
      onChange({ id: null, name: inputValue });
    }
  };

  return (
    <div className={`w-full ${className ?? ""}`}>
      <Combobox value={value.id ?? undefined} onChange={handleSelect} nullable>
        <div className="relative">
          <ComboboxInput
            className="w-full px-4 py-2 border border-sky-100 rounded-lg text-sm bg-sky-50 focus:ring-2 focus:ring-sky-300 outline-none transition"
            displayValue={() => inputValue}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder={placeholder || "Selecione ou digite o item"}
            autoComplete="off"
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronsUpDown className="h-5 w-5 text-sky-400" />
          </ComboboxButton>
          {/* O menu é absoluto e z-50, para não ser cortado pelo scroll */}
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
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-sky-100 text-sky-900" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
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
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600`}
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
