export type HabitCategory = "health" | "productivity" | "social" | "mindfulness";

export interface Habit {
  id: string;
  name: string;
  emoji: string;
  category: HabitCategory;
  completed: boolean;
  streak: number;
}

export const categoryColors: Record<HabitCategory, { light: string; dark: string }> = {
  health: { light: "bg-emerald-100 text-emerald-700", dark: "dark:bg-emerald-900/40 dark:text-emerald-300" },
  productivity: { light: "bg-purple-100 text-purple-700", dark: "dark:bg-purple-900/40 dark:text-purple-300" },
  social: { light: "bg-blue-100 text-blue-700", dark: "dark:bg-blue-900/40 dark:text-blue-300" },
  mindfulness: { light: "bg-orange-100 text-orange-700", dark: "dark:bg-orange-900/40 dark:text-orange-300" },
};

export const defaultHabits: Habit[] = [
  { id: "1", name: "Exercise", emoji: "🏃", category: "health", completed: false, streak: 5 },
  { id: "2", name: "Read for 30 minutes", emoji: "📚", category: "productivity", completed: true, streak: 12 },
  { id: "3", name: "Meditate", emoji: "🧘", category: "mindfulness", completed: false, streak: 3 },
  { id: "4", name: "Drink 8 glasses of water", emoji: "💧", category: "health", completed: false, streak: 7 },
];

export const emojiOptions = ["🏃", "📚", "🧘", "💧", "🎯", "💪", "🥗", "😴", "🎨", "🎵", "✍️", "🌱"];
