import mongoose from "mongoose";
import type { Document } from "mongoose";

interface IHabit extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  category: string;
  frequency: {
    type: "daily" | "weekly";
    daysOfWeek?: number[];
  };
  goal: {
    type: "build" | "quit";
  };
  color: string;
  icon: string;
  isArchived: boolean;
  archivedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const habitSchema = new mongoose.Schema<IHabit>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    frequency: {
      type: {
        type: String,
        enum: ["daily", "weekly"],
        required: true,
      },
      daysOfWeek: {
        type: [Number],
        required: false,
      },
    },
    goal: {
      type: {
        type: String,
        enum: ["build", "quit"],
        required: true,
      },
    },
    color: { type: String, default: "#3B82F6" },
    icon: { type: String, default: "🎯" },
    isArchived: { type: Boolean, default: false },
    archivedAt: { type: Date },
  },
  { timestamps: true }
);

const HabitModel = mongoose.model<IHabit>("Habit", habitSchema);
export default HabitModel;
