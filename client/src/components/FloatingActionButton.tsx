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
        "fixed bottom-8 right-8 h-16 w-16 rounded-full",
        "bg-gradient-to-br from-habit-primary to-emerald-600",
        "flex items-center justify-center",
        "shadow-lg shadow-habit-primary/30",
        "transition-all duration-300 ease-out",
        "hover:scale-110 hover:shadow-xl hover:shadow-habit-primary/40",
        "active:scale-95",
        "z-30",
      )}
      aria-label="Add new habit"
    >
      <Plus className="h-8 w-8" strokeWidth={2.5} />
    </button>
  );
}
