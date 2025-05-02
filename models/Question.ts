import mongoose, { Schema, model, models } from "mongoose";

const QuestionSchema = new Schema({
  quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswerIndex: { type: Number, required: true },
  points: { type: Number, default: 1 },
});

export default models.Question || model("Question", QuestionSchema);
