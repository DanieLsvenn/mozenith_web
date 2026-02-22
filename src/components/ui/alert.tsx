import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";

interface AlertProps {
  variant?: "default" | "success" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Alert({
  variant = "default",
  title,
  children,
  className,
}: AlertProps) {
  const variants = {
    default: {
      container: "bg-[#EEEEEE] border-[#CCCCCC]",
      icon: "text-[#666666]",
      title: "text-[#3D3D3D]",
      content: "text-[#666666]",
      Icon: Info,
    },
    success: {
      container: "bg-[#52C41A]/10 border-[#52C41A]/30",
      icon: "text-[#52C41A]",
      title: "text-[#3D3D3D]",
      content: "text-[#52C41A]",
      Icon: CheckCircle2,
    },
    warning: {
      container: "bg-[#FAAD14]/10 border-[#FAAD14]/30",
      icon: "text-[#FAAD14]",
      title: "text-[#3D3D3D]",
      content: "text-[#FAAD14]",
      Icon: AlertCircle,
    },
    error: {
      container: "bg-[#FF4D4F]/10 border-[#FF4D4F]/30",
      icon: "text-[#FF4D4F]",
      title: "text-[#3D3D3D]",
      content: "text-[#FF4D4F]",
      Icon: XCircle,
    },
  };

  const {
    container,
    icon,
    title: titleClass,
    content,
    Icon,
  } = variants[variant];

  return (
    <div
      className={cn("flex gap-3 rounded-lg border p-4", container, className)}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0", icon)} />
      <div className="flex-1">
        {title && (
          <h5 className={cn("mb-1 font-medium", titleClass)}>{title}</h5>
        )}
        <div className={cn("text-sm", content)}>{children}</div>
      </div>
    </div>
  );
}
