import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface MaxWidthWrapperProps {
  className?: string;
  children: ReactNode;
}

export const MaxWidthWrapper = ({
  className,
  children,
}: MaxWidthWrapperProps) => {
  return (
    <div
      className={cn(
        "h-full mx-auto w-full px-[72px]  overflow-x-hidden",
        className
      )}
    >
      {children}
    </div>
  );
};
