import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Habit, HabitCategory, emojiOptions } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface HabitSlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    habit: Omit<Habit, "id" | "completed" | "streak"> & { id?: string },
  ) => void;
  editingHabit?: Habit | null;
}

export function HabitSlidePanel({
  isOpen,
  onClose,
  onSave,
  editingHabit,
}: HabitSlidePanelProps) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("ðŸŽ¯");
  const [category, setCategory] = useState<HabitCategory>("health");

  useEffect(() => {
    if (editingHabit) {
      setName(editingHabit.name);
      setEmoji(editingHabit.emoji);
      setCategory(editingHabit.category);
    } else {
      setName("");
      setEmoji("ðŸŽ¯");
      setCategory("health");
    }
  }, [editingHabit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id: editingHabit?.id,
      name: name.trim(),
      emoji,
      category,
    });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-background border-l shadow-2xl z-50 transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-foreground">
              {editingHabit ? "Edit Habit" : "Create New Habit"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              aria-label="Close panel"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col p-6 gap-6"
          >
            {/* Habit Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Habit Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Morning meditation"
                className="h-12"
              />
            </div>

            {/* Emoji Picker */}
            <div className="space-y-2">
              <Label>Choose an Emoji</Label>
              <div className="grid grid-cols-6 gap-2">
                {emojiOptions.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setEmoji(e)}
                    className={cn(
                      "h-12 w-12 rounded-lg text-2xl flex items-center justify-center transition-all duration-200",
                      emoji === e
                        ? "bg-green-100 ring-2 ring-green-500 scale-110"
                        : "bg-gray-100 hover:bg-gray-200",
                    )}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={category}
                onValueChange={(v) => setCategory(v as HabitCategory)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="health">🥗 Health</SelectItem>
                  <SelectItem value="productivity">⚡ Productivity</SelectItem>
                  <SelectItem value="social">👥 Social</SelectItem>
                  <SelectItem value="mindfulness">🧘 Mindfulness</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-12"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!name.trim()}
                className="flex-1 h-12 bg-green-500 hover:bg-green-600 text-white"
              >
                {editingHabit ? "Save Changes" : "Create Habit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
