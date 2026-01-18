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
        message: "Completion Updated",
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
  } catch (e) {
    return res.status(500).json({
      message: "Failed to update completion",
      error: e instanceof Error ? e.message : "Unknown error",
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
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't get today's completions",
      error: e instanceof Error ? e.message : "Unknown error",
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
  } catch (e) {
    return res.status(500).json({
      message: "Failed to fetch completion history",
      error: e instanceof Error ? e.message : "Unknown error",
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
      message: "Completion updated succesfully",
      completion,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't update habit",
      error: e instanceof Error ? e.message : "Unknown error",
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
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't undo completion",
      error: e instanceof Error ? e.message : "Unknown error",
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
