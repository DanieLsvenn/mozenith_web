import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "destructive"
    | "outline"
    | "info";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-[#0054C5] text-white",
      secondary: "bg-[#99E7F1] text-[#3D3D3D]",
      success: "bg-[#52C41A]/10 text-[#52C41A] border border-[#52C41A]/20",
      warning: "bg-[#FAAD14]/10 text-[#FAAD14] border border-[#FAAD14]/20",
      destructive: "bg-[#FF4D4F]/10 text-[#FF4D4F] border border-[#FF4D4F]/20",
      info: "bg-[#1890FF]/10 text-[#1890FF] border border-[#1890FF]/20",
      outline: "border border-[#EEEEEE] text-[#666666]",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          variants[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

export { Badge };
