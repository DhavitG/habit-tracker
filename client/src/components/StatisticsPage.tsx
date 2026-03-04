import { useState } from "react";
import {
  Flame,
  CheckCircle2,
  TrendingUp,
  Target,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Minus,
} from "lucide-react";
import { Habit, categoryColors } from "@/types/habit";
import { getHabitStats, calculateStreak } from "@/utils/habitHelpers";
import { cn } from "@/lib/utils";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  subMonths,
  addMonths,
  isToday,
  isFuture,
  parseISO,
} from "date-fns";

interface StatisticsPageProps {
  habits: Habit[];
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function StatisticsPage({
  habits,
  selectedDate,
  onSelectDate,
}: StatisticsPageProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // ── Overview stats ──
  const allStats = habits.map((h) => getHabitStats(h));
  const bestStreak = Math.max(0, ...habits.map((h) => calculateStreak(h)));
  const totalCompletions = allStats.reduce(
    (sum, s) => sum + s.totalCompletions,
    0,
  );
  const avgRate =
    allStats.length > 0
      ? Math.round(
          allStats.reduce((sum, s) => sum + s.completionRate, 0) /
            allStats.length,
        )
      : 0;

  // ── Calendar grid ──
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // getDay: 0=Sun, convert so Mon=0
  const startDayOfWeek = (getDay(monthStart) + 6) % 7;

  function getCompletionPercent(dateKey: string): number {
    if (habits.length === 0) return -1;
    const completed = habits.filter((h) => h.completions[dateKey]).length;
    return Math.round((completed / habits.length) * 100);
  }

  function getCellColor(percent: number): string {
    if (percent < 0) return "bg-muted";
    if (percent === 0) return "bg-muted";
    if (percent < 50) return "bg-success/20";
    if (percent < 100) return "bg-success/40";
    return "bg-success";
  }

  // ── Date detail ──
  const selectedDateHabits = selectedDate
    ? habits.map((h) => ({
        ...h,
        completedOnDate: !!h.completions[selectedDate],
      }))
    : [];

  const completedOnDate = selectedDateHabits.filter(
    (h) => h.completedOnDate,
  ).length;

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Statistics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your progress over time
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Flame className="h-4 w-4 mx-auto mb-1.5 text-orange-500" />
          <div className="text-xl font-bold text-foreground">{bestStreak}</div>
          <div className="text-[11px] text-muted-foreground">Best Streak</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <CheckCircle2 className="h-4 w-4 mx-auto mb-1.5 text-primary" />
          <div className="text-xl font-bold text-foreground">
            {totalCompletions}
          </div>
          <div className="text-[11px] text-muted-foreground">Completions</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <TrendingUp className="h-4 w-4 mx-auto mb-1.5 text-secondary" />
          <div className="text-xl font-bold text-foreground">{avgRate}%</div>
          <div className="text-[11px] text-muted-foreground">Avg Rate</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Target className="h-4 w-4 mx-auto mb-1.5 text-accent" />
          <div className="text-xl font-bold text-foreground">
            {habits.length}
          </div>
          <div className="text-[11px] text-muted-foreground">
            Active Habits
          </div>
        </div>
      </div>

      {/* Monthly Calendar */}
      <section className="mb-8">
        <div className="rounded-xl border border-border bg-card p-6">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            </button>
            <h2 className="text-sm font-semibold text-foreground">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <button
              onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
              disabled={isFuture(addMonths(startOfMonth(currentMonth), 1))}
            >
              <ChevronRight
                className={cn(
                  "h-4 w-4",
                  isFuture(addMonths(startOfMonth(currentMonth), 1))
                    ? "text-muted-foreground/30"
                    : "text-muted-foreground",
                )}
              />
            </button>
          </div>

          {/* Day-of-week headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAY_LABELS.map((day) => (
              <div
                key={day}
                className="text-[11px] font-medium text-muted-foreground text-center py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for offset */}
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Day cells */}
            {daysInMonth.map((day) => {
              const dateKey = format(day, "yyyy-MM-dd");
              const future = isFuture(day);
              const today = isToday(day);
              const isSelected = selectedDate === dateKey;
              const percent = future ? -1 : getCompletionPercent(dateKey);
              const cellColor = getCellColor(percent);

              return (
                <button
                  key={dateKey}
                  onClick={() => {
                    if (!future) {
                      onSelectDate(isSelected ? null : dateKey);
                    }
                  }}
                  disabled={future}
                  className={cn(
                    "aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all",
                    future
                      ? "text-muted-foreground/30 cursor-not-allowed"
                      : cellColor,
                    !future &&
                      percent > 0 &&
                      percent < 100 &&
                      "text-foreground",
                    !future && percent === 100 && "text-primary-foreground",
                    !future && percent <= 0 && "text-muted-foreground",
                    !future && "hover:ring-2 hover:ring-ring/30",
                    today && !isSelected && "ring-1 ring-primary/40",
                    isSelected && "ring-2 ring-primary",
                  )}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-4">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-muted" />
              <div className="w-3 h-3 rounded-sm bg-success/20" />
              <div className="w-3 h-3 rounded-sm bg-success/40" />
              <div className="w-3 h-3 rounded-sm bg-success" />
            </div>
            <span>More</span>
          </div>
        </div>
      </section>

      {/* Date Detail */}
      {selectedDate && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                {format(parseISO(selectedDate), "EEEE, MMMM d, yyyy")}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {completedOnDate} / {habits.length} completed
              </p>
            </div>
            <button
              onClick={() => onSelectDate(null)}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <div className="space-y-1.5">
            {selectedDateHabits.map((habit) => {
              const categoryStyle = categoryColors[habit.category];
              return (
                <div
                  key={habit.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border border-border bg-card",
                    !habit.completedOnDate && "opacity-50",
                  )}
                >
                  {/* Status icon */}
                  <div
                    className={cn(
                      "flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center",
                      habit.completedOnDate
                        ? "bg-success/15 text-success"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {habit.completedOnDate ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Minus className="h-3.5 w-3.5" />
                    )}
                  </div>

                  {/* Emoji */}
                  <span className="text-lg flex-shrink-0">{habit.emoji}</span>

                  {/* Name + category */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {habit.name}
                    </p>
                  </div>

                  <span
                    className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium capitalize flex-shrink-0",
                      categoryStyle.light,
                      categoryStyle.dark,
                    )}
                  >
                    {habit.category}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
