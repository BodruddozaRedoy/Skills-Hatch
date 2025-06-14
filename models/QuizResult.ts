import mongoose, { Schema, model, models } from "mongoose";

const QuizResultSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: "User", required: true },
  quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
  score: Number,
  submittedAt: { type: Date, default: Date.now },
});

export default models.QuizResult || model("QuizResult", QuizResultSchema);
