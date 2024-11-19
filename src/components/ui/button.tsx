import React from "react";
import { cn } from "../../utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  text?: string;
  isLoading?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const Button = ({
  variant = "primary",
  size = "md",
  startIcon,
  endIcon,
  text,
  isLoading,
  fullWidth,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500",
    secondary:
      "bg-indigo-100 text-blue-900 hover:bg-indigo-200 focus-visible:ring-indigo-500",
    outline:
      "border border-gray-300 bg-white hover:bg-gray-50 focus-visible:ring-gray-500",
    ghost: "hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "h-12 px-6 text-base gap-2.5",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin mr-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      ) : startIcon ? (
        <span className="inline-flex shrink-0">{startIcon}</span>
      ) : null}

      {text || children}

      {endIcon && !isLoading && (
        <span className="inline-flex shrink-0">{endIcon}</span>
      )}
    </button>
  );
};

export default Button;
