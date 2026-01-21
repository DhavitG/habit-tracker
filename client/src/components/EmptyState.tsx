import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onCreateClick: () => void;
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="h-20 w-20 rounded-full bg-habit-primary/10 flex items-center justify-center mb-6">
        <Sparkles className="h-10 w-10 text-habit-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">No habits yet</h3>
      <p className="text-muted-foreground text-center max-w-sm mb-6">
        Create your first habit to start building better routines and tracking your progress.
      </p>
      <Button
        onClick={onCreateClick}
        className="bg-habit-primary hover:bg-habit-primary/90 text-white px-6 h-11"
      >
        Create Your First Habit
      </Button>
    </div>
  );
}
