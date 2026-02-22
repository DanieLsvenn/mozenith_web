import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "ghost"
    | "link"
    | "secondary"
    | "cta";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default:
        "bg-[#0054C5] text-white hover:bg-[#003D91] focus-visible:ring-[#0054C5]",
      secondary:
        "bg-[#99E7F1] text-[#3D3D3D] hover:bg-[#7AD4E0] focus-visible:ring-[#99E7F1]",
      cta: "bg-[#FF6B00] text-white hover:bg-[#E55F00] focus-visible:ring-[#FF6B00]",
      destructive:
        "bg-[#FF4D4F] text-white hover:bg-red-600 focus-visible:ring-[#FF4D4F]",
      outline:
        "border border-[#EEEEEE] bg-white hover:bg-[#EEEEEE] hover:text-[#3D3D3D] focus-visible:ring-[#0054C5] text-[#3D3D3D]",
      ghost: "hover:bg-[#EEEEEE] hover:text-[#3D3D3D] text-[#666666]",
      link: "text-[#0054C5] underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 px-3 text-xs",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };
