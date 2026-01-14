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
      message: "New habit created succesfully",
      habit: newHabit,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Failed to create habit",
      error: e instanceof Error ? e.message : "Unknown error",
    });
  }
};

const getAllHabits = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const habits = await HabitModel.find({ userId }); // find gets you multiple docs

    return res.status(200).json({
      habits,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Failed to fetch habits",
      error: e instanceof Error ? e.message : "Unknown error",
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
      { new: true }
    );

    if (!updateHabit) {
      res.status(404).json({ message: "Habit Not Found" });
    }

    res.status(200).json({
      message: "Habit updated succesfully!",
      updateHabit,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Failed to update habit",
      error: e instanceof Error ? e.message : "Unknown error",
    });
  }
};

const deleteHabit = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const habitId = req.params.id;

    const deletedHabit = await HabitModel.findByIdAndDelete({
      _id: habitId,
      userId,
    });

    if (!deletedHabit)
      return res.status(404).json({ message: "Habit not found" });
    res.status(200).json({
      message: "Habit deleted succesfully!",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Failed to delete habit",
      error: e instanceof Error ? e.message : "Unknown error",
    });
  }
};

export { createHabit, getAllHabits, updateHabit, deleteHabit };
