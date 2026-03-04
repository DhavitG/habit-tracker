import { Habit } from "@/types/habit";
import {
  format,
  subDays,
  startOfWeek,
  eachDayOfInterval,
  isFuture,
  getMonth,
} from "date-fns";
import { cn } from "@/lib/utils";

interface CalendarHeatmapProps {
  habit: Habit;
}

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const CalendarHeatmap = ({ habit }: CalendarHeatmapProps) => {
  const today = new Date();
  const startDate = subDays(today, 89); // 90 days including today
  // Align to Monday of that week so the grid starts clean
  const gridStart = startOfWeek(startDate, { weekStartsOn: 1 });

  const allDays = eachDayOfInterval({ start: gridStart, end: today });

  // Group into weeks (columns)
  const weeks: Date[][] = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }
  // Pad last week if incomplete
  const lastWeek = weeks[weeks.length - 1];
  while (lastWeek && lastWeek.length < 7) {
    lastWeek.push(subDays(today, -1)); // push a future date as placeholder
  }

  // Month labels — find first occurrence of each month in the grid
  const monthPositions: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, colIdx) => {
    for (const day of week) {
      const m = getMonth(day);
      if (m !== lastMonth && !isFuture(day)) {
        lastMonth = m;
        monthPositions.push({ label: MONTH_LABELS[m], col: colIdx });
        break;
      }
    }
  });

  const isInRange = (day: Date) => {
    const dateKey = format(day, "yyyy-MM-dd");
    const startKey = format(startDate, "yyyy-MM-dd");
    return dateKey >= startKey && !isFuture(day);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="overflow-x-auto pb-1">
        <div className="inline-flex flex-col">
          {/* Month labels */}
          <div className="flex ml-[28px]">
            {weeks.map((week, colIdx) => {
              const monthLabel = monthPositions.find((m) => m.col === colIdx);
              return (
                <div
                  key={colIdx}
                  className="flex-shrink-0"
                  style={{ width: "16px" }}
                >
                  {monthLabel && (
                    <span className="text-[10px] text-muted-foreground">
                      {monthLabel.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Grid: day labels + cells */}
          <div className="flex">
            {/* Day labels column */}
            <div className="flex flex-col gap-[3px] pr-1.5 flex-shrink-0 w-[28px]">
              {DAY_LABELS.map((label, i) => (
                <div
                  key={i}
                  className="h-[13px] text-[10px] text-muted-foreground leading-[13px] flex items-center justify-end"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Week columns */}
            <div className="flex gap-[3px]">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-[3px]">
                  {week.map((day, dayIdx) => {
                    const dateKey = format(day, "yyyy-MM-dd");
                    const future = isFuture(day);
                    const inRange = isInRange(day);
                    const isCompleted = inRange && habit.completions[dateKey];

                    if (!inRange) {
                      return (
                        <div
                          key={`${weekIdx}-${dayIdx}`}
                          className="w-[13px] h-[13px]"
                        />
                      );
                    }

                    return (
                      <div
                        key={dateKey}
                        title={`${format(day, "MMM d, yyyy")}${isCompleted ? " ✓" : ""}`}
                        className={cn(
                          "w-[13px] h-[13px] rounded-sm transition-colors",
                          isCompleted
                            ? "bg-success hover:bg-success/80"
                            : "bg-muted hover:bg-muted-foreground/20",
                        )}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-1">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-[10px] h-[10px] rounded-sm bg-muted" />
          <div className="w-[10px] h-[10px] rounded-sm bg-success/30" />
          <div className="w-[10px] h-[10px] rounded-sm bg-success/60" />
          <div className="w-[10px] h-[10px] rounded-sm bg-success" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};
