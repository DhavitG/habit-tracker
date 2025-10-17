import { Habit, HabitStats } from "@/types/habit";
import { format, subDays, parseISO, startOfDay, differenceInDays } from "date-fns";

export const getTodayKey = () => format(new Date(), "yyyy-MM-dd");

export const isHabitCompletedToday = (habit: Habit): boolean => {
  return habit.completions[getTodayKey()] || false;
};

export const getLast90Days = (): string[] => {
  const days: string[] = [];
  for (let i = 89; i >= 0; i--) {
    days.push(format(subDays(new Date(), i), "yyyy-MM-dd"));
  }
  return days;
};

export const calculateStreak = (habit: Habit): number => {
  let streak = 0;
  let currentDate = new Date();
  
  while (true) {
    const dateKey = format(currentDate, "yyyy-MM-dd");
    if (habit.completions[dateKey]) {
      streak++;
      currentDate = subDays(currentDate, 1);
    } else {
      break;
    }
  }
  
  return streak;
};

export const getHabitStats = (habit: Habit): HabitStats => {
  const totalCompletions = Object.values(habit.completions).filter(Boolean).length;
  const currentStreak = calculateStreak(habit);
  
  const daysSinceCreation = differenceInDays(
    startOfDay(new Date()),
    startOfDay(parseISO(habit.createdAt))
  ) + 1;
  
  const completionRate = daysSinceCreation > 0 
    ? Math.round((totalCompletions / daysSinceCreation) * 100) 
    : 0;
  
  return {
    currentStreak,
    totalCompletions,
    completionRate,
  };
};

export const categoryColors: Record<string, string> = {
  Health: "habit-health",
  Productivity: "habit-productivity",
  Social: "habit-social",
  Mindfulness: "habit-mindfulness",
  Other: "habit-other",
};
