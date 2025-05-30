import * as React from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from "@/common/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";

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
  const [open, setOpen] = React.useState(false);
  const selected = options.find((opt) => opt.id === value);

  return (
    <div className="w-full">
      <label className="flex items-center text-sm font-semibold text-sky-700 mb-1 gap-1">
        {icon}
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label={label}
            className="w-full flex items-center justify-between px-4 py-2 border border-sky-100 rounded-lg text-sm bg-sky-50 focus:ring-2 focus:ring-sky-300 outline-none transition"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className={selected ? "text-sky-900" : "text-gray-400"}>
              {selected ? selected.name : placeholder || "Selecione"}
            </span>
            <ChevronDown className="w-4 h-4 text-sky-400 ml-2" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-[var(--radix-popover-trigger-width)] min-w-[180px] max-h-72"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Buscar..." className="h-9" autoFocus />
            <CommandList>
              <CommandEmpty>Nenhum resultado</CommandEmpty>
              <CommandGroup>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.id}
                    value={opt.name}
                    onSelect={() => {
                      onChange(opt.id);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Check
                      className={`w-4 h-4 text-sky-500 transition-opacity ${
                        value === opt.id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <span>{opt.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
