import { ChevronDown } from "lucide-react";
import { createContext, ReactNode, useContext, useState } from "react";
import { cn } from "../../utils";

const SelectContext = createContext<{
  value: string;
  setValue: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  value: "",
  setValue: () => {},
  open: false,
  setOpen: () => {},
});

export const Select = ({
  children,
  value: controlledValue,
  onValueChange,
}: {
  children: ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState("");
  const [open, setOpen] = useState(false);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;
  const setValue = isControlled
    ? onValueChange || (() => {})
    : setUncontrolledValue;

  return (
    <SelectContext.Provider
      value={{
        value,
        setValue,
        open,
        setOpen,
      }}
    >
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger = ({ children }: { children: ReactNode }) => {
  const { value, open, setOpen } = useContext(SelectContext);

  return (
    <button
      onClick={() => setOpen(!open)}
      className={cn(
        "flex w-full items-center justify-between rounded-md border px-3 py-2",
        "bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500",
        !value && "text-gray-400"
      )}
    >
      {children}
      <ChevronDown size={16} className="text-gray-500" />
    </button>
  );
};

export const SelectValue = ({ placeholder }: { placeholder: string }) => {
  const { value } = useContext(SelectContext);
  return <span>{value || placeholder}</span>;
};

export const SelectContent = ({ children }: { children: ReactNode }) => {
  const { open, setOpen } = useContext(SelectContext);

  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg",
        "border animate-fade-in-up"
      )}
    >
      <div
        className="max-h-60 overflow-auto rounded-md py-1"
        onClick={() => setOpen(false)}
      >
        {children}
      </div>
    </div>
  );
};

export const SelectItem = ({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) => {
  const { setValue } = useContext(SelectContext);

  return (
    <div
      onClick={() => setValue(value)}
      className={cn(
        "cursor-pointer px-3 py-2 hover:bg-gray-100",
        "text-gray-900 hover:text-black"
      )}
    >
      {children}
    </div>
  );
};

export default {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
};
