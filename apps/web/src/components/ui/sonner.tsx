"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group  border shadow-lg  "
      style={
        {
          "--normal-bg": "white ",
          "--normal-text": "black",
          "--normal-border": "border-gray-200 dark:border-gray-700 rounded-2xl",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
