import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  fullName: string;
  email: string;
  password?: string;
  googleId?: string;
  settings: {
    timezone?: string;
    weekStartsOn?: string;
    theme?: string;
  };
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String },
    googleId: { type: String },
    settings: {
      timezone: { type: String, default: "Asia/Kolkata" },
      weekStartsOn: { type: String, default: "monday" },
      theme: { type: String, default: "light" },
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
