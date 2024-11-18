import React from "react";

interface ButtonProps {
  vaiant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  startIcon: React.ReactNode;
  endIcon: React.ReactNode;
  text: string;
  onClick: () => void;
}

export const Button = ({ text, endIcon, startIcon }: ButtonProps) => {
  return (
    <button>
      {startIcon}
      <p>{text}</p>

      {endIcon}
    </button>
  );
};
