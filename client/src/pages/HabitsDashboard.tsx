import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Habit, defaultHabits } from "@/components/types";
import { HabitCard } from "@/components/HabitCard";
import { HabitSlidePanel } from "@/components/HabitSlidePanel";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { EmptyState } from "@/components/EmptyState";
import { DarkModeToggle } from "@/components/DarkModeToggle";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function HabitsDashboard() {
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [deletingHabit, setDeletingHabit] = useState<Habit | null>(null);

  const handleToggle = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completed: !habit.completed,
              streak: !habit.completed
                ? habit.streak + 1
                : Math.max(0, habit.streak - 1),
            }
          : habit,
      ),
    );
  };

  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsPanelOpen(true);
  };

  const handleDelete = (habit: Habit) => {
    setDeletingHabit(habit);
  };

  const confirmDelete = () => {
    if (deletingHabit) {
      setHabits((prev) => prev.filter((h) => h.id !== deletingHabit.id));
      setDeletingHabit(null);
    }
  };

  const handleSave = (habitData: {
    id?: string;
    name: string;
    emoji: string;
    category: Habit["category"];
  }) => {
    if (habitData.id) {
      setHabits((prev) =>
        prev.map((h) =>
          h.id === habitData.id
            ? {
                ...h,
                name: habitData.name,
                emoji: habitData.emoji,
                category: habitData.category,
              }
            : h,
        ),
      );
    } else {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: habitData.name,
        emoji: habitData.emoji,
        category: habitData.category,
        completed: false,
        streak: 0,
      };
      setHabits((prev) => [...prev, newHabit]);
    }
    setEditingHabit(null);
  };

  const openNewHabitPanel = () => {
    setEditingHabit(null);
    setIsPanelOpen(true);
  };

  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <header className="flex items-start justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {getGreeting()}, Sarah
              </h1>
              <p className="text-gray-600">{formatDate()}</p>
            </div>
          </header>

          {/* Progress summary */}
          {habits.length > 0 && (
            <div className="mb-8">
              <p className="text-sm text-gray-600">
                <span className="text-gray-900 font-semibold">
                  {completedCount}
                </span>{" "}
                of{" "}
                <span className="text-gray-900 font-semibold">
                  {habits.length}
                </span>{" "}
                habits completed today
              </p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${(completedCount / habits.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Habits list */}
          {habits.length === 0 ? (
            <EmptyState onCreateClick={openNewHabitPanel} />
          ) : (
            <div className="space-y-3">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggle={handleToggle}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        {/* Floating Button */}
        <FloatingActionButton onClick={openNewHabitPanel} />

        {/* Slide Panel */}
        <HabitSlidePanel
          isOpen={isPanelOpen}
          onClose={() => {
            setIsPanelOpen(false);
            setEditingHabit(null);
          }}
          onSave={handleSave}
          editingHabit={editingHabit}
        />

        {/* Delete Dialog */}
        <DeleteConfirmDialog
          habit={deletingHabit}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingHabit(null)}
        />
      </div>
    </div>
  );
}
