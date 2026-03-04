import { Habit } from "@/types/habit";
import { format, subDays } from "date-fns";

const generateCompletions = (
  daysBack: number,
  successRate: number = 0.7,
): Record<string, boolean> => {
  const completions: Record<string, boolean> = {};
  for (let i = 0; i < daysBack; i++) {
    const date = format(subDays(new Date(), i), "yyyy-MM-dd");
    completions[date] = Math.random() < successRate;
  }
  return completions;
};

export const mockHabits: Habit[] = [
  {
    id: "1",
    name: "Morning Workout",
    description: "30 minutes of exercise to start the day",
    category: "health",
    emoji: "💪",
    goal: "build",
    frequency: "daily",
    createdAt: format(subDays(new Date(), 60), "yyyy-MM-dd"),
    completions: generateCompletions(60, 0.75),
  },
  {
    id: "2",
    name: "Read 30 min",
    description: "Read for at least 30 minutes",
    category: "productivity",
    emoji: "📚",
    goal: "build",
    frequency: "daily",
    createdAt: format(subDays(new Date(), 45), "yyyy-MM-dd"),
    completions: generateCompletions(45, 0.65),
  },
  {
    id: "3",
    name: "Drink 8 glasses of water",
    description: "Stay hydrated throughout the day",
    category: "health",
    emoji: "💧",
    goal: "build",
    frequency: "daily",
    createdAt: format(subDays(new Date(), 30), "yyyy-MM-dd"),
    completions: generateCompletions(30, 0.8),
  },
  {
    id: "4",
    name: "Meditation",
    description: "10 minutes of mindful meditation",
    category: "mindfulness",
    emoji: "🧘",
    goal: "build",
    frequency: "daily",
    createdAt: format(subDays(new Date(), 20), "yyyy-MM-dd"),
    completions: generateCompletions(20, 0.6),
  },
  {
    id: "5",
    name: "Stop Doom Scrolling",
    description: "No mindless social media browsing",
    category: "mindfulness",
    emoji: "📱",
    goal: "quit",
    frequency: "daily",
    createdAt: format(subDays(new Date(), 25), "yyyy-MM-dd"),
    completions: generateCompletions(25, 0.55),
  },
  {
    id: "6",
    name: "No Junk Food",
    description: "Avoid fast food and processed snacks",
    category: "health",
    emoji: "🍔",
    goal: "quit",
    frequency: "daily",
    createdAt: format(subDays(new Date(), 35), "yyyy-MM-dd"),
    completions: generateCompletions(35, 0.7),
  },
];
