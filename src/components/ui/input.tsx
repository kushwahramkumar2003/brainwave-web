import React, { forwardRef } from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { cn } from "../../utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: FieldError;
  register?: UseFormRegister<any>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label = "", name, error, register, ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          className={cn(
            "w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...(register ? register(name) : {})}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
