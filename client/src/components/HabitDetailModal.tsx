import { Habit, categoryColors } from "@/types/habit";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarHeatmap } from "./CalendarHeatmap";
import { getHabitStats } from "@/utils/habitHelpers";
import { Edit2, Trash2, Flame, CheckCircle2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface HabitDetailModalProps {
  habit: Habit | null;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const HabitDetailModal = ({
  habit,
  open,
  onClose,
  onEdit,
  onDelete,
}: HabitDetailModalProps) => {
  if (!habit) return null;

  const stats = getHabitStats(habit);
  const style = categoryColors[habit.category];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{habit.emoji}</span>
              <div>
                <DialogTitle className="text-xl mb-1.5">
                  {habit.name}
                </DialogTitle>
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                    style.light,
                    style.dark,
                  )}
                >
                  {habit.category}
                </span>
              </div>
            </div>

            <div className="flex gap-1.5">
              <Button
                variant="outline"
                size="icon"
                onClick={onEdit}
                className="h-8 w-8"
              >
                <Edit2 className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={onDelete}
                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {habit.description && (
            <p className="text-sm text-muted-foreground">{habit.description}</p>
          )}

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-muted rounded-lg p-3 sm:p-4 text-center">
              <Flame className="h-5 w-5 mx-auto mb-1.5 text-orange-500" />
              <div className="text-2xl font-bold text-foreground">
                {stats.currentStreak}
              </div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            <div className="bg-muted rounded-lg p-3 sm:p-4 text-center">
              <CheckCircle2 className="h-5 w-5 mx-auto mb-1.5 text-primary" />
              <div className="text-2xl font-bold text-foreground">
                {stats.totalCompletions}
              </div>
              <div className="text-xs text-muted-foreground">Completions</div>
            </div>
            <div className="bg-muted rounded-lg p-3 sm:p-4 text-center">
              <TrendingUp className="h-5 w-5 mx-auto mb-1.5 text-secondary" />
              <div className="text-2xl font-bold text-foreground">
                {stats.completionRate}%
              </div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3 text-foreground">
              Last 90 Days
            </h3>
            <CalendarHeatmap habit={habit} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
