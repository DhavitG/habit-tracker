import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-20 right-4 md:bottom-8 md:right-8 h-14 w-14 rounded-full",
        "bg-primary text-primary-foreground",
        "flex items-center justify-center",
        "shadow-lg transition-all duration-200",
        "hover:scale-105 hover:shadow-xl",
        "active:scale-95",
        "z-50",
      )}
      aria-label="Add new habit"
    >
      <Plus className="h-6 w-6" strokeWidth={2.5} />
    </button>
  );
}
