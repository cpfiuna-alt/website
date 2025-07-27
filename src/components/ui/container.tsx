
import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Container({
  className,
  as: Component = "div",
  size = "lg",
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto px-4 sm:px-6 w-full",
        {
          "max-w-screen-sm": size === "sm",
          "max-w-screen-md": size === "md",
          "max-w-screen-lg": size === "lg",
          "max-w-screen-xl": size === "xl",
          "max-w-full": size === "full",
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
