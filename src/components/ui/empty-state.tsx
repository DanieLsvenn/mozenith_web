import { cn } from "@/lib/utils";
import { FileQuestion } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 text-center",
        className,
      )}
    >
      <div className="mb-4 rounded-full bg-[#EEEEEE] p-4">
        {icon || <FileQuestion className="h-8 w-8 text-[#666666]" />}
      </div>
      <h3 className="mb-1 text-lg font-medium text-[#3D3D3D]">{title}</h3>
      {description && (
        <p className="mb-4 max-w-sm text-sm text-[#666666]">{description}</p>
      )}
      {action}
    </div>
  );
}
