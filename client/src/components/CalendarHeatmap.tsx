import { Habit } from "@/types/habit";
import { getLast90Days } from "@/utils/habitHelpers";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format, parseISO } from "date-fns";

interface CalendarHeatmapProps {
  habit: Habit;
}

export const CalendarHeatmap = ({ habit }: CalendarHeatmapProps) => {
  const last90Days = getLast90Days();
  
  // Group days into weeks
  const weeks: string[][] = [];
  for (let i = 0; i < last90Days.length; i += 7) {
    weeks.push(last90Days.slice(i, i + 7));
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 overflow-x-auto pb-2">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day) => {
                const isCompleted = habit.completions[day];
                const date = parseISO(day);
                
                return (
                  <Tooltip key={day}>
                    <TooltipTrigger asChild>
                      <div
                        className={`w-3 h-3 rounded-sm transition-colors ${
                          isCompleted
                            ? "bg-success hover:bg-success/80"
                            : "bg-muted hover:bg-muted-foreground/20"
                        }`}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">
                        {format(date, "MMM d, yyyy")}
                        {isCompleted ? " ✓" : ""}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-muted" />
            <div className="w-3 h-3 rounded-sm bg-success/30" />
            <div className="w-3 h-3 rounded-sm bg-success/60" />
            <div className="w-3 h-3 rounded-sm bg-success" />
          </div>
          <span>More</span>
        </div>
      </div>
    </TooltipProvider>
  );
};
