import type { Request, Response } from "express";
import CompletionModel from "../models/Completion.js";

const updateCompletion = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { habitId, completed, date, notes } = req.body;

    const completionDate = date ? new Date(date) : new Date();
    completionDate.setHours(0, 0, 0, 0);

    const existingCompletion = await CompletionModel.findOne({
      userId,
      habitId,
      date: completionDate,
    });

    if (existingCompletion) {
      existingCompletion.completed = completed;
      if (notes !== undefined) existingCompletion.notes = notes;

      await existingCompletion.save();
      return res.status(200).json({
        message: "Completion updated",
        completion: existingCompletion,
      });
    } else {
      const newCompletion = await CompletionModel.create({
        userId,
        habitId,
        completed,
        date: completionDate,
        notes,
      });

      return res.status(201).json({
        message: "Completion created",
        completion: newCompletion,
      });
    }
  } catch (e: any) {
    console.error("Update completion error:", e);

    if (e.name === "CastError") {
      return res.status(400).json({
        message: "Invalid habit or completion ID",
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

const getTodayCompletions = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const completions = await CompletionModel.find({
      userId,
      date: today,
    });

    return res.status(200).json({
      completions,
    });
  } catch (e: any) {
    console.error("Get today completions error:", e);

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

const getCompletionHabits = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { habitId } = req.params;

    const completionHistory = await CompletionModel.find({
      userId,
      habitId,
    });

    return res.status(200).json({
      completions: completionHistory,
    });
  } catch (e: any) {
    console.error("Get completion history error:", e);

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

const updateSpecificHabitCompletion = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { completed, notes } = req.body;

    const completion = await CompletionModel.findOneAndUpdate(
      { _id: id, userId },
      { completed, notes },
      { new: true },
    );

    if (!completion) {
      return res.status(404).json({ message: "Completion not found" });
    }

    return res.status(200).json({
      message: "Completion updated successfully",
      completion,
    });
  } catch (e: any) {
    console.error("Update specific completion error:", e);

    if (e.name === "CastError") {
      return res.status(400).json({
        message: "Invalid completion ID",
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

const deleteCompletion = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const completion = await CompletionModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!completion) {
      return res.status(404).json({ message: "Completion not found" });
    }

    return res.status(200).json({
      message: "Completion deleted successfully",
    });
  } catch (e: any) {
    console.error("Delete completion error:", e);

    if (e.name === "CastError") {
      return res.status(400).json({
        message: "Invalid completion ID",
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

export {
  updateCompletion,
  getTodayCompletions,
  getCompletionHabits,
  updateSpecificHabitCompletion,
  deleteCompletion,
};
