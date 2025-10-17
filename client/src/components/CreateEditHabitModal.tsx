import { useState } from "react";
import { Habit, HabitCategory, FrequencyType } from "@/types/habit";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

interface CreateEditHabitModalProps {
  habit: Habit | null;
  open: boolean;
  onClose: () => void;
  onSave: (habit: Partial<Habit>) => void;
}

const categories: HabitCategory[] = ["Health", "Productivity", "Social", "Mindfulness", "Other"];
const emojis = ["💪", "📚", "💧", "🧘", "🏃", "🎯", "✍️", "🎨", "🎵", "🌱", "☕", "🌙"];

export const CreateEditHabitModal = ({ habit, open, onClose, onSave }: CreateEditHabitModalProps) => {
  const [formData, setFormData] = useState<Partial<Habit>>({
    name: habit?.name || "",
    description: habit?.description || "",
    category: habit?.category || "Health",
    emoji: habit?.emoji || "💪",
    frequency: habit?.frequency || "daily",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{habit ? "Edit Habit" : "Create New Habit"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Habit Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Morning Workout"
              required
              className="border-2 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add more details about your habit..."
              className="border-2 focus:border-primary resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value as HabitCategory })}
            >
              <SelectTrigger id="category" className="border-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Choose Emoji *</Label>
            <div className="grid grid-cols-6 gap-2">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData({ ...formData, emoji })}
                  className={`text-3xl p-2 rounded-lg transition-all hover:bg-muted ${
                    formData.emoji === emoji ? "bg-primary/10 ring-2 ring-primary" : ""
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency *</Label>
            <Select
              value={formData.frequency}
              onValueChange={(value) => setFormData({ ...formData, frequency: value as FrequencyType })}
            >
              <SelectTrigger id="frequency" className="border-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="daily">Every Day</SelectItem>
                <SelectItem value="custom">Custom Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {habit ? "Save Changes" : "Create Habit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
