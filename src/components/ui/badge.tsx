import React, { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "../../utils";

const badgeVariants = {
  default: "bg-gray-100 text-gray-800",
  secondary: "bg-gray-200 text-gray-700",
  destructive: "bg-red-100 text-red-800",
  success: "bg-green-100 text-green-800",
  outline: "border border-gray-300 bg-white text-gray-700",
};

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants;
  removable?: boolean;
  onRemove?: () => void;
  children: ReactNode;
}

export const Badge = ({
  variant = "default",
  removable = false,
  onRemove,
  children,
  className,
  ...props
}: BadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        badgeVariants[variant],
        removable && "pr-1",
        className
      )}
      {...props}
    >
      {children}
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-gray-300/50 rounded-full p-0.5 transition-colors"
          aria-label="Remove"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default Badge;
