import type { Request, Response, NextFunction } from "express";
import CompletionModel from "../models/Completion.js";

const updateCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

      res.status(201).json({
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

const getTodayCompletions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const completions = await CompletionModel.find({
      userId,
      date: today,
    });

    return res.json(200).json({
      completions,
    });
  } catch (e) {
    res.status(500).json({
      message: "Couldn't get today's completions",
      error: e instanceof Error ? e.message : "Unknown error",
    });
  }
};

export { updateCompletion, getTodayCompletions };
