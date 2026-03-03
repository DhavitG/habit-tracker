import { Pencil, Trash2, Flame, TrendingUp } from "lucide-react";
import { Habit, categoryColors } from "@/types/habit";
import {
  isHabitCompletedToday,
  calculateStreak,
  getHabitStats,
  getTodayKey,
} from "@/utils/habitHelpers";
import { cn } from "@/lib/utils";

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
  onClick?: (habit: Habit) => void;
}

export function HabitCard({
  habit,
  onToggle,
  onEdit,
  onDelete,
  onClick,
}: HabitCardProps) {
  const completed = isHabitCompletedToday(habit);
  const streak = calculateStreak(habit);
  const stats = getHabitStats(habit);
  const categoryStyle = categoryColors[habit.category];

  return (
    <div
      className={cn(
        "group relative flex items-center gap-4 p-4 rounded-xl border border-border bg-card transition-all duration-200",
        "hover:shadow-md hover:border-border/80",
        completed && "opacity-75",
      )}
    >
      {/* Checkbox */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle(habit.id);
        }}
        className={cn(
          "flex-shrink-0 h-7 w-7 rounded-lg border-2 transition-all duration-200 flex items-center justify-center",
          completed
            ? "bg-primary border-primary"
            : "border-muted-foreground/30 hover:border-primary",
        )}
        aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {completed && (
          <svg
            className="h-4 w-4 text-primary-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      {/* Emoji */}
      <span className="text-2xl flex-shrink-0">{habit.emoji}</span>

      {/* Content */}
      <button
        className="flex-1 min-w-0 text-left"
        onClick={() => onClick?.(habit)}
      >
        <h3
          className={cn(
            "text-sm font-medium text-foreground transition-all duration-200",
            completed && "line-through text-muted-foreground",
          )}
        >
          {habit.name}
        </h3>
        {habit.description && (
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {habit.description}
          </p>
        )}
        <div className="flex items-center gap-2 mt-1.5">
          <span
            className={cn(
              "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium capitalize",
              categoryStyle.light,
              categoryStyle.dark,
            )}
          >
            {habit.category}
          </span>
          {streak > 0 && (
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
              <Flame className="h-3 w-3 text-orange-500" />
              {streak}d
            </span>
          )}
          {stats.completionRate > 0 && (
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-primary" />
              {stats.completionRate}%
            </span>
          )}
        </div>
      </button>

      {/* Actions */}
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(habit);
          }}
          className="p-1.5 rounded-md hover:bg-muted transition-colors"
          aria-label="Edit habit"
        >
          <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(habit);
          }}
          className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors"
          aria-label="Delete habit"
        >
          <Trash2 className="h-3.5 w-3.5 text-destructive" />
        </button>
      </div>
    </div>
  );
}
