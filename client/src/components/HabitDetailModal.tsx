import { Habit } from "@/types/habit";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarHeatmap } from "./CalendarHeatmap";
import { getHabitStats, categoryColors } from "@/utils/habitHelpers";
import { Edit2, Trash2, Flame, CheckCircle2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface HabitDetailModalProps {
  habit: Habit | null;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const HabitDetailModal = ({ habit, open, onClose, onEdit, onDelete }: HabitDetailModalProps) => {
  if (!habit) return null;

  const stats = getHabitStats(habit);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-5xl">{habit.emoji}</span>
              <div>
                <DialogTitle className="text-2xl mb-2">{habit.name}</DialogTitle>
                <Badge 
                  variant="secondary"
                  className={cn(
                    "text-sm",
                    `bg-${categoryColors[habit.category]}/10 text-${categoryColors[habit.category]}`
                  )}
                >
                  {habit.category}
                </Badge>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={onEdit}
                className="hover:bg-primary/10 hover:text-primary hover:border-primary"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={onDelete}
                className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {habit.description && (
            <div>
              <p className="text-muted-foreground">{habit.description}</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-muted rounded-lg p-4 text-center">
              <Flame className="h-6 w-6 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold text-foreground">{stats.currentStreak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            
            <div className="bg-muted rounded-lg p-4 text-center">
              <CheckCircle2 className="h-6 w-6 mx-auto mb-2 text-success" />
              <div className="text-2xl font-bold text-foreground">{stats.totalCompletions}</div>
              <div className="text-sm text-muted-foreground">Total Completions</div>
            </div>
            
            <div className="bg-muted rounded-lg p-4 text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">{stats.completionRate}%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Last 90 Days</h3>
            <CalendarHeatmap habit={habit} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
