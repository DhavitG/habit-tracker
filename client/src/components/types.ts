export type {
  Habit,
  HabitCategory,
  FrequencyType,
  HabitStats,
} from "@/types/habit";

// Category display colors
export const categoryColors: Record<string, { light: string; dark: string }> = {
  Health: {
    light: "bg-emerald-100 text-emerald-700",
    dark: "dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  Productivity: {
    light: "bg-purple-100 text-purple-700",
    dark: "dark:bg-purple-900/40 dark:text-purple-300",
  },
  Social: {
    light: "bg-blue-100 text-blue-700",
    dark: "dark:bg-blue-900/40 dark:text-blue-300",
  },
  Mindfulness: {
    light: "bg-orange-100 text-orange-700",
    dark: "dark:bg-orange-900/40 dark:text-orange-300",
  },
  Other: {
    light: "bg-gray-100 text-gray-700",
    dark: "dark:bg-gray-900/40 dark:text-gray-300",
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

export const categoryList: { value: string; label: string }[] = [
  { value: "Health", label: "🥗 Health" },
  { value: "Productivity", label: "⚡ Productivity" },
  { value: "Social", label: "👥 Social" },
  { value: "Mindfulness", label: "🧘 Mindfulness" },
  { value: "Other", label: "📌 Other" },
];
