import { useState } from "react";
import { ArchiveRestore, Archive, ChevronDown } from "lucide-react";
import { Habit, HabitCategory, categoryColors, categoryLabels, GoalType } from "@/types/habit";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";

interface ArchivedHabitsPageProps {
  habits: Habit[];
  onUnarchive: (id: string) => void;
}

const filterOptions: Array<{ id: HabitCategory | "all"; label: string }> = [
  { id: "all", label: "All" },
  { id: "health", label: categoryLabels.health },
  { id: "productivity", label: categoryLabels.productivity },
  { id: "social", label: categoryLabels.social },
  { id: "mindfulness", label: categoryLabels.mindfulness },
];

const goalFilterOptions: Array<{ id: GoalType | "all"; label: string }> = [
  { id: "all", label: "All" },
  { id: "build", label: "Building" },
  { id: "quit", label: "Quitting" },
];

export function ArchivedHabitsPage({
  habits,
  onUnarchive,
}: ArchivedHabitsPageProps) {
  const [filter, setFilter] = useState<HabitCategory | "all">("all");
  const [goalFilter, setGoalFilter] = useState<GoalType | "all">("all");
  const [goalDropdownOpen, setGoalDropdownOpen] = useState(false);

  const filteredHabits = habits.filter((h) => {
    const categoryMatch = filter === "all" || h.category === filter;
    const goalMatch = goalFilter === "all" || h.goal === goalFilter;
    return categoryMatch && goalMatch;
  });

  const activeGoalLabel =
    goalFilterOptions.find((o) => o.id === goalFilter)?.label || "All";

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Archived</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {habits.length === 0
            ? "Habits you archive will appear here"
            : `${habits.length} archived habit${habits.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Filters Row */}
      {habits.length > 0 && (
        <div className="flex items-center gap-3 mb-6">
          {/* Category pills */}
          <div className="flex items-center gap-1.5">
            {filterOptions.map((option) => {
              const isActive = filter === option.id;
              const count =
                option.id === "all"
                  ? habits.length
                  : habits.filter((h) => h.category === option.id).length;

              if (option.id !== "all" && count === 0) return null;

              return (
                <button
                  key={option.id}
                  onClick={() => setFilter(option.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {option.label}
                  <span className="ml-1 opacity-60">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Separator */}
          <div className="w-px h-5 bg-border" />

          {/* Goal type dropdown */}
          <div className="relative">
            <button
              onClick={() => setGoalDropdownOpen((o) => !o)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                goalFilter !== "all"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {activeGoalLabel}
              <ChevronDown
                className={cn(
                  "h-3 w-3 transition-transform",
                  goalDropdownOpen && "rotate-180",
                )}
              />
            </button>
            {goalDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setGoalDropdownOpen(false)}
                />
                <div className="absolute top-full left-0 mt-1 z-20 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[120px]">
                  {goalFilterOptions.map((option) => {
                    const count =
                      option.id === "all"
                        ? habits.length
                        : habits.filter((h) => h.goal === option.id).length;

                    return (
                      <button
                        key={option.id}
                        onClick={() => {
                          setGoalFilter(option.id);
                          setGoalDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-1.5 text-xs transition-colors",
                          goalFilter === option.id
                            ? "text-primary font-medium"
                            : "text-foreground hover:bg-muted",
                        )}
                      >
                        <span>{option.label}</span>
                        <span className="text-muted-foreground">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {habits.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <Archive className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            No archived habits yet
          </p>
        </div>
      ) : filteredHabits.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-sm text-muted-foreground">
            No archived habits match these filters
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredHabits.map((habit) => {
            const categoryStyle = categoryColors[habit.category];
            const isQuit = habit.goal === "quit";
            const archivedDate = habit.archivedAt
              ? format(parseISO(habit.archivedAt), "MMM d, yyyy")
              : "Unknown date";

            return (
              <div
                key={habit.id}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border border-border bg-card",
                  isQuit
                    ? "border-l-[3px] border-l-red-500"
                    : "border-l-[3px] border-l-emerald-500",
                )}
              >
                {/* Emoji */}
                <span className="text-2xl flex-shrink-0">{habit.emoji}</span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground">
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
                    <span className="text-[11px] text-muted-foreground">
                      Archived on {archivedDate}
                    </span>
                  </div>
                </div>

                {/* Unarchive */}
                <button
                  onClick={() => onUnarchive(habit.id)}
                  className="flex-shrink-0 h-8 px-3 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors flex items-center gap-1.5"
                >
                  <ArchiveRestore className="h-3.5 w-3.5" />
                  Restore
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
