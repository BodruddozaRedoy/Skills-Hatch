import mongoose, { Schema, model, models } from "mongoose";

const AchievementSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    icon: String,
    condition: String,
  },
  { timestamps: true }
);

export default models.Achievement || model("Achievement", AchievementSchema);
