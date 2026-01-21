import { useState } from "react";
import { Pencil, Trash2, Flame } from "lucide-react";
import { Habit, categoryColors } from "./types";
import { cn } from "@/lib/utils";

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
}

export function HabitCard({
  habit,
  onToggle,
  onEdit,
  onDelete,
}: HabitCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleToggle = () => {
    setIsChecking(true);
    setTimeout(() => {
      onToggle(habit.id);
      setIsChecking(false);
    }, 200);
  };

  const categoryStyle = categoryColors[habit.category];

  return (
    <div
      className={cn(
        "group relative flex items-center gap-4 p-4 rounded-xl border bg-card transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-0.5",
        "dark:hover:shadow-xl dark:hover:shadow-black/20",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Emoji */}
      <div className="flex-shrink-0 text-[40px] leading-none">
        {habit.emoji}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            "text-lg font-semibold text-foreground transition-all duration-200",
            habit.completed && "line-through opacity-60",
          )}
        >
          {habit.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize transition-colors duration-300",
              categoryStyle.light,
              categoryStyle.dark,
            )}
          >
            {habit.category}
          </span>
          {habit.streak > 0 && (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Flame className="h-3.5 w-3.5 text-orange-500" />
              {habit.streak} days
            </span>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div
        className={cn(
          "flex items-center gap-1 transition-opacity duration-200",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      >
        <button
          onClick={() => onEdit(habit)}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          aria-label="Edit habit"
        >
          <Pencil className="h-4 w-4 text-muted-foreground" />
        </button>
        <button
          onClick={() => onDelete(habit)}
          className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
          aria-label="Delete habit"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </button>
      </div>

      {/* Checkbox */}
      <button
        onClick={handleToggle}
        className={cn(
          "flex-shrink-0 h-8 w-8 rounded-lg border-2 transition-all duration-200 flex items-center justify-center",
          habit.completed
            ? "bg-green-500 border-green-500"
            : "border-gray-300 hover:border-green-500",
          isChecking && "scale-90",
        )}
        aria-label={habit.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        <svg
          className={cn(
            "h-5 w-5 text-white transition-all duration-200",
            habit.completed ? "opacity-100 scale-100" : "opacity-0 scale-50",
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
            className={cn(
              "transition-all duration-300",
              habit.completed ? "stroke-dashoffset-0" : "stroke-dashoffset-100",
            )}
            style={{
              strokeDasharray: 24,
              strokeDashoffset: habit.completed ? 0 : 24,
            }}
          />
        </svg>
      </button>
    </div>
  );
}
