import { ArchiveRestore, Archive } from "lucide-react";
import { Habit, categoryColors } from "@/types/habit";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";

interface ArchivedHabitsPageProps {
  habits: Habit[];
  onUnarchive: (id: string) => void;
}

export function ArchivedHabitsPage({
  habits,
  onUnarchive,
}: ArchivedHabitsPageProps) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Archived</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {habits.length === 0
            ? "Habits you archive will appear here"
            : `${habits.length} archived habit${habits.length !== 1 ? "s" : ""}`}
        </p>
      </div>

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
      ) : (
        <div className="space-y-2">
          {habits.map((habit) => {
            const categoryStyle = categoryColors[habit.category];
            const archivedDate = habit.archivedAt
              ? format(parseISO(habit.archivedAt), "MMM d, yyyy")
              : "Unknown date";

            return (
              <div
                key={habit.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card"
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
