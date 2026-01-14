import mongoose from "mongoose";
import type { Document } from "mongoose";

interface ICompletion extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  habitId: mongoose.Schema.Types.ObjectId;
  completed: boolean;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const completionSchema = new mongoose.Schema<ICompletion>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    habitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
    },
    completed: { type: Boolean, default: false, required: true },
    date: {
      type: Date,
      required: true,
      default: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
      },
    },
    notes: { type: String },
  },
  { timestamps: true }
);

completionSchema.index({ habitId: 1, date: 1 }, { unique: true });

const CompletionModel = mongoose.model<ICompletion>(
  "Completion",
  completionSchema
);
export default CompletionModel;
