export type HabitCategory = "Health" | "Productivity" | "Social" | "Mindfulness" | "Other";

export type FrequencyType = "daily" | "custom";

export interface Habit {
  id: string;
  name: string;
  description?: string;
  category: HabitCategory;
  emoji: string;
  color: string;
  frequency: FrequencyType;
  customDays?: number[]; // 0-6 for Sun-Sat
  createdAt: string;
  completions: Record<string, boolean>; // date string as key
}

export interface HabitStats {
  currentStreak: number;
  totalCompletions: number;
  completionRate: number;
}
