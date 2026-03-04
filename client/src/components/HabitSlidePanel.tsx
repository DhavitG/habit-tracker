import { useEffect, useState } from "react";
import { X, TrendingUp, ShieldOff } from "lucide-react";
import {
  Habit,
  HabitCategory,
  GoalType,
  emojiOptions,
  categoryLabels,
} from "@/types/habit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface HabitSlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (habit: Habit) => void;
  editingHabit?: Habit | null;
}

export function HabitSlidePanel({
  isOpen,
  onClose,
  onSave,
  editingHabit,
}: HabitSlidePanelProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("🎯");
  const [category, setCategory] = useState<HabitCategory>("health");
  const [goal, setGoal] = useState<GoalType>("build");

  useEffect(() => {
    if (editingHabit) {
      setName(editingHabit.name);
      setDescription(editingHabit.description || "");
      setEmoji(editingHabit.emoji);
      setCategory(editingHabit.category);
      setGoal(editingHabit.goal || "build");
    } else {
      setName("");
      setDescription("");
      setEmoji("🎯");
      setCategory("health");
      setGoal("build");
    }
  }, [editingHabit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const habit: Habit = {
      id: editingHabit?.id || Date.now().toString(),
      name: name.trim(),
      description: description.trim() || undefined,
      emoji,
      category,
      goal,
      frequency: editingHabit?.frequency || "daily",
      createdAt: editingHabit?.createdAt || format(new Date(), "yyyy-MM-dd"),
      completions: editingHabit?.completions || {},
    };

    onSave(habit);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 z-40 transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-xl z-50 transition-transform duration-200 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">
              {editingHabit ? "Edit Habit" : "New Habit"}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-muted transition-colors"
              aria-label="Close panel"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col px-4 sm:px-6 py-4 sm:py-5 gap-5 overflow-y-auto"
          >
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Morning meditation"
                className="h-10"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm">Goal</Label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setGoal("build")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-medium transition-all border",
                    goal === "build"
                      ? "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700"
                      : "bg-muted text-muted-foreground border-transparent hover:text-foreground",
                  )}
                >
                  <TrendingUp className="h-4 w-4" />
                  Build
                </button>
                <button
                  type="button"
                  onClick={() => setGoal("quit")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-medium transition-all border",
                    goal === "quit"
                      ? "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700"
                      : "bg-muted text-muted-foreground border-transparent hover:text-foreground",
                  )}
                >
                  <ShieldOff className="h-4 w-4" />
                  Quit
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground">
                {goal === "build"
                  ? "A habit you want to develop and maintain"
                  : "A habit you want to break and stop doing"}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="desc" className="text-sm">
                Description
              </Label>
              <Textarea
                id="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional details..."
                className="resize-none"
                rows={2}
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm">Emoji</Label>
              <div className="grid grid-cols-6 gap-1.5">
                {emojiOptions.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setEmoji(e)}
                    className={cn(
                      "h-10 w-10 rounded-lg text-xl flex items-center justify-center transition-all",
                      emoji === e
                        ? "bg-primary/10 ring-2 ring-primary"
                        : "bg-muted hover:bg-muted/80",
                    )}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="category" className="text-sm">
                Category
              </Label>
              <Select
                value={category}
                onValueChange={(v) => setCategory(v as HabitCategory)}
              >
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(categoryLabels) as HabitCategory[]).map(
                    (key) => (
                      <SelectItem key={key} value={key}>
                        {categoryLabels[key]}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Actions */}
            <div className="flex gap-3 pb-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!name.trim()}
                className="flex-1 h-10"
              >
                {editingHabit ? "Save" : "Create"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
