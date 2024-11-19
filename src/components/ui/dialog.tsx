import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
  HTMLAttributes,
} from "react";
import { X} from "lucide-react";
import { cn } from "../../utils";

const DialogContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  open: false,
  setOpen: () => {},
});

export const Dialog = ({
  children,
  open: controlledOpen,
  onOpenChange,
}: {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = isControlled
    ? onOpenChange || (() => {})
    : setUncontrolledOpen;

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

export const DialogTrigger = ({ children }: { children: ReactNode }) => {
  const { setOpen } = useContext(DialogContext);

  return React.cloneElement(children as React.ReactElement, {
    onClick: () => setOpen(true),
  });
};

export const DialogContent = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { open, setOpen } = useContext(DialogContext);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={contentRef}
        className={cn(
          "relative bg-white rounded-lg p-6 w-full max-w-md shadow-xl",
          "animate-fade-in-up transform transition-all duration-300",
          className
        )}
        {...props}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 hover:bg-gray-100 rounded-full p-1"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export const DialogHeader = ({ children }: { children: ReactNode }) => (
  <div className="mb-4">{children}</div>
);

export const DialogTitle = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <h2 className={`text-xl font-semibold text-gray-900 ${className}`}>
    {children}
  </h2>
);

export default {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
};
