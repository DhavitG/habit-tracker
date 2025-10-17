import { Habit } from "@/types/habit";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { categoryColors } from "@/utils/habitHelpers";

interface HabitCardProps {
  habit: Habit;
  isCompleted: boolean;
  onToggle: () => void;
  onClick: () => void;
}

export const HabitCard = ({ habit, isCompleted, onToggle, onClick }: HabitCardProps) => {
  return (
    <Card 
      className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="text-4xl flex-shrink-0">{habit.emoji}</div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground mb-2 truncate">
              {habit.name}
            </h3>
            <Badge 
              variant="secondary" 
              className={cn(
                "text-xs font-medium",
                `bg-${categoryColors[habit.category]}/10 text-${categoryColors[habit.category]} hover:bg-${categoryColors[habit.category]}/20`
              )}
            >
              {habit.category}
            </Badge>
          </div>
        </div>
        
        <div 
          className="flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          <Checkbox
            checked={isCompleted}
            className={cn(
              "h-8 w-8 rounded-lg border-2 transition-all duration-200",
              isCompleted && "animate-check-bounce bg-success border-success"
            )}
          />
        </div>
      </div>
    </Card>
  );
};
