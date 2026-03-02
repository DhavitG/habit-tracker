import HabitModel from "../models/Habit.js";
import type { Request, Response } from "express";

const createHabit = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const { name, description, category, frequency, goal, color, icon } =
      req.body;

    const newHabit = await HabitModel.create({
      userId,
      name,
      description,
      category,
      frequency,
      goal,
      color,
      icon,
    });

    return res.status(201).json({
      message: "New habit created successfully",
      habit: newHabit,
    });
  } catch (e: any) {
    console.error("Create habit error:", e);

    if (e.name === "ValidationError") {
      return res.status(422).json({
        message: "Invalid data provided",
      });
    }

    if (e.name === "MongoNetworkError" || e.name === "MongoServerError") {
      return res.status(503).json({
        message: "Database service temporarily unavailable. Please try again later.",
      });
    }

    return res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

const getAllHabits = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const habits = await HabitModel.find({ userId });

    return res.status(200).json({
      habits,
    });
  } catch (e: any) {
    console.error("Get habits error:", e);

    if (e.name === "MongoNetworkError" || e.name === "MongoServerError") {
      return res.status(503).json({
        message: "Database service temporarily unavailable. Please try again later.",
      });
    }

    return res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

const updateHabit = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const habitId = req.params.id;

    const {
      name,
      description,
      category,
      frequency,
      goal,
      color,
      icon,
      isArchived,
    } = req.body;

    const updatedHabit = await HabitModel.findOneAndUpdate(
      { _id: habitId, userId },
      { name, description, category, frequency, goal, color, icon, isArchived },
      { new: true },
    );

    if (!updatedHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    return res.status(200).json({
      message: "Habit updated successfully",
      habit: updatedHabit,
    });
  } catch (e: any) {
    console.error("Update habit error:", e);

    if (e.name === "CastError") {
      return res.status(400).json({
        message: "Invalid habit ID",
      });
    }

    if (e.name === "ValidationError") {
      return res.status(422).json({
        message: "Invalid data provided",
      });
    }

    if (e.name === "MongoNetworkError" || e.name === "MongoServerError") {
      return res.status(503).json({
        message: "Database service temporarily unavailable. Please try again later.",
      });
    }

    return res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

const deleteHabit = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const habitId = req.params.id;

    const deletedHabit = await HabitModel.findOneAndDelete({
      _id: habitId,
      userId,
    });

    if (!deletedHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    return res.status(200).json({
      message: "Habit deleted successfully",
    });
  } catch (e: any) {
    console.error("Delete habit error:", e);

    if (e.name === "CastError") {
      return res.status(400).json({
        message: "Invalid habit ID",
      });
    }

    if (e.name === "MongoNetworkError" || e.name === "MongoServerError") {
      return res.status(503).json({
        message: "Database service temporarily unavailable. Please try again later.",
      });
    }

    return res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

export { createHabit, getAllHabits, updateHabit, deleteHabit };
