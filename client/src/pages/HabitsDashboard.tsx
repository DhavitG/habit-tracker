import { useState } from "react";
import { Home, BarChart3, Archive, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Habit } from "@/types/habit";
import { HabitCard } from "@/components/HabitCard";
import { HabitSlidePanel } from "@/components/HabitSlidePanel";
import { HabitDetailModal } from "@/components/HabitDetailModal";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { ArchiveConfirmDialog } from "@/components/ArchiveConfirmDialog";
import { ArchivedHabitsPage } from "@/components/ArchivedHabitsPage";
import { StatisticsPage } from "@/components/StatisticsPage";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { EmptyState } from "@/components/EmptyState";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { SettingsPage } from "@/components/SettingsPage";
import { mockHabits } from "@/data/mockHabits";
import { isHabitCompletedToday, getTodayKey } from "@/utils/habitHelpers";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { id: "today", icon: Home, label: "Today" },
  { id: "statistics", icon: BarChart3, label: "Stats" },
  { id: "archived", icon: Archive, label: "Archived" },
  { id: "settings", icon: Settings, label: "Settings" },
];

function getUserFirstName(): string {
  try {
    const stored = localStorage.getItem("user");
    if (stored) {
      const user = JSON.parse(stored);
      return user.fullName?.split(" ")[0] || "";
    }
  } catch {}
  return "";
}

function getGreeting(): string {
  const hour = new Date().getHours();
  const name = getUserFirstName();
  const suffix = name ? `, ${name}` : "";
  if (hour < 12) return `Good morning${suffix}`;
  if (hour < 17) return `Good afternoon${suffix}`;
  return `Good evening${suffix}`;
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function HabitsDashboard() {
  const navigate = useNavigate();
  const [habits, setHabits] = useState<Habit[]>(mockHabits);
  const [activeTab, setActiveTab] = useState("today");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [deletingHabit, setDeletingHabit] = useState<Habit | null>(null);
  const [archivingHabit, setArchivingHabit] = useState<Habit | null>(null);
  const [viewingHabit, setViewingHabit] = useState<Habit | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const todayKey = getTodayKey();

  // Filter habits by archived status
  const activeHabits = habits.filter((h) => !h.isArchived);
  const archivedHabits = habits.filter((h) => h.isArchived);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Clear selected date when leaving statistics
    if (tab !== "statistics") {
      setSelectedDate(null);
    }
  };

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

  const handleArchive = (habit: Habit) => {
    setArchivingHabit(habit);
  };

  const confirmArchive = () => {
    if (archivingHabit) {
      setHabits((prev) =>
        prev.map((h) =>
          h.id === archivingHabit.id
            ? { ...h, isArchived: true, archivedAt: new Date().toISOString() }
            : h,
        ),
      );
      setArchivingHabit(null);
      setViewingHabit(null);
    }
  };

  const handleUnarchive = (id: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, isArchived: false, archivedAt: undefined }
          : h,
      ),
    );
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

  const completedCount = activeHabits.filter((h) =>
    isHabitCompletedToday(h),
  ).length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        selectedDate={selectedDate}
        onClearDate={() => setSelectedDate(null)}
      />

      <div className="flex-1 pb-16 md:pb-0 overflow-x-hidden">
        {activeTab === "settings" ? (
          <SettingsPage />
        ) : activeTab === "archived" ? (
          <ArchivedHabitsPage
            habits={archivedHabits}
            onUnarchive={handleUnarchive}
          />
        ) : activeTab === "statistics" ? (
          <StatisticsPage
            habits={activeHabits}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        ) : (
          <>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
              {/* Header */}
              <header className="flex items-start justify-between mb-6 sm:mb-8">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-0.5">
                    {getGreeting()}
                  </h1>
                  <p className="text-sm text-muted-foreground">{formatDate()}</p>
                </div>
                <DarkModeToggle />
              </header>

              {/* Progress */}
              {activeHabits.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-baseline justify-between mb-2">
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground font-semibold">
                        {completedCount}
                      </span>
                      {" / "}
                      <span className="text-foreground font-semibold">
                        {activeHabits.length}
                      </span>
                      {" completed"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activeHabits.length > 0
                        ? Math.round(
                            (completedCount / activeHabits.length) * 100,
                          )
                        : 0}
                      %
                    </p>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{
                        width: `${(completedCount / activeHabits.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Habits List */}
              {activeHabits.length === 0 ? (
                <EmptyState onCreateClick={openNewHabitPanel} />
              ) : (
                <div className="space-y-2">
                  {activeHabits.map((habit) => (
                    <HabitCard
                      key={habit.id}
                      habit={habit}
                      onToggle={handleToggle}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onArchive={handleArchive}
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
              onArchive={() => {
                if (viewingHabit) {
                  setViewingHabit(null);
                  handleArchive(viewingHabit);
                }
              }}
            />

            {/* Delete Confirmation */}
            <DeleteConfirmDialog
              habit={deletingHabit}
              onConfirm={confirmDelete}
              onCancel={() => setDeletingHabit(null)}
            />

            {/* Archive Confirmation */}
            <ArchiveConfirmDialog
              habit={archivingHabit}
              onConfirm={confirmArchive}
              onCancel={() => setArchivingHabit(null)}
            />
          </>
        )}
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border md:hidden">
        <div className="flex items-center justify-around h-14">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/signin", { replace: true });
            }}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-muted-foreground transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-[10px] font-medium">Sign Out</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
