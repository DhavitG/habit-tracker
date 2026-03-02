import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Habit } from "@/types/habit";
import { HabitCard } from "@/components/HabitCard";
import { HabitSlidePanel } from "@/components/HabitSlidePanel";
import { HabitDetailModal } from "@/components/HabitDetailModal";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { EmptyState } from "@/components/EmptyState";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { mockHabits } from "@/data/mockHabits";
import { isHabitCompletedToday, getTodayKey } from "@/utils/habitHelpers";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function HabitsDashboard() {
  const [habits, setHabits] = useState<Habit[]>(mockHabits);
  const [activeTab, setActiveTab] = useState("today");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [deletingHabit, setDeletingHabit] = useState<Habit | null>(null);
  const [viewingHabit, setViewingHabit] = useState<Habit | null>(null);

  const todayKey = getTodayKey();

  const handleToggle = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completions: {
                ...habit.completions,
                [todayKey]: !habit.completions[todayKey],
              },
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
      setViewingHabit(null);
    }
  };

  const handleSave = (habit: Habit) => {
    setHabits((prev) => {
      const exists = prev.find((h) => h.id === habit.id);
      if (exists) {
        return prev.map((h) => (h.id === habit.id ? habit : h));
      }
      return [...prev, habit];
    });
    setEditingHabit(null);
  };

  const openNewHabitPanel = () => {
    setEditingHabit(null);
    setIsPanelOpen(true);
  };

  const completedCount = habits.filter((h) => isHabitCompletedToday(h)).length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-8">
          {/* Header */}
          <header className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-0.5">
                {getGreeting()}
              </h1>
              <p className="text-sm text-muted-foreground">{formatDate()}</p>
            </div>
            <DarkModeToggle />
          </header>

          {/* Progress */}
          {habits.length > 0 && (
            <div className="mb-8">
              <div className="flex items-baseline justify-between mb-2">
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-semibold">
                    {completedCount}
                  </span>
                  {" / "}
                  <span className="text-foreground font-semibold">
                    {habits.length}
                  </span>
                  {" completed"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {habits.length > 0
                    ? Math.round((completedCount / habits.length) * 100)
                    : 0}
                  %
                </p>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{
                    width: `${(completedCount / habits.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Habits List */}
          {habits.length === 0 ? (
            <EmptyState onCreateClick={openNewHabitPanel} />
          ) : (
            <div className="space-y-2">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggle={handleToggle}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onClick={setViewingHabit}
                />
              ))}
            </div>
          )}
        </div>

        <FloatingActionButton onClick={openNewHabitPanel} />

        {/* Slide Panel for Create/Edit */}
        <HabitSlidePanel
          isOpen={isPanelOpen}
          onClose={() => {
            setIsPanelOpen(false);
            setEditingHabit(null);
          }}
          onSave={handleSave}
          editingHabit={editingHabit}
        />

        {/* Detail Modal */}
        <HabitDetailModal
          habit={viewingHabit}
          open={!!viewingHabit}
          onClose={() => setViewingHabit(null)}
          onEdit={() => {
            if (viewingHabit) {
              setViewingHabit(null);
              handleEdit(viewingHabit);
            }
          }}
          onDelete={() => {
            if (viewingHabit) {
              setViewingHabit(null);
              handleDelete(viewingHabit);
            }
          }}
        />

        {/* Delete Confirmation */}
        <DeleteConfirmDialog
          habit={deletingHabit}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingHabit(null)}
        />
      </div>
    </div>
  );
}
