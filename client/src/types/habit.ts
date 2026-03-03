export type HabitCategory =
  | "health"
  | "productivity"
  | "social"
  | "mindfulness";

export type FrequencyType = "daily" | "custom";

export interface Habit {
  id: string;
  name: string;
  description?: string;
  category: HabitCategory;
  emoji: string;
  color?: string;
  frequency: FrequencyType;
  customDays?: number[]; // 0-6 for Sun-Sat
  createdAt: string;
  completions: Record<string, boolean>; // date string -> completed
  isArchived?: boolean;
  archivedAt?: string;
}

export interface HabitStats {
  currentStreak: number;
  totalCompletions: number;
  completionRate: number;
}

export const categoryColors: Record<
  HabitCategory,
  { light: string; dark: string }
> = {
  health: {
    light: "bg-emerald-100 text-emerald-700",
    dark: "dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  productivity: {
    light: "bg-purple-100 text-purple-700",
    dark: "dark:bg-purple-900/40 dark:text-purple-300",
  },
  social: {
    light: "bg-blue-100 text-blue-700",
    dark: "dark:bg-blue-900/40 dark:text-blue-300",
  },
  mindfulness: {
    light: "bg-orange-100 text-orange-700",
    dark: "dark:bg-orange-900/40 dark:text-orange-300",
  },
};

export const emojiOptions = [
  "🏃",
  "📚",
  "🧘",
  "💧",
  "🎯",
  "💪",
  "🥗",
  "😴",
  "🎨",
  "🎵",
  "✍️",
  "🌱",
];

export const categoryLabels: Record<HabitCategory, string> = {
  health: "Health",
  productivity: "Productivity",
  social: "Social",
  mindfulness: "Mindfulness",
};
