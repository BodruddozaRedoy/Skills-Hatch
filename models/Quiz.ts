import mongoose, { Schema, model, models } from "mongoose";

const QuizSchema = new Schema(
  {
    lesson: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    passingScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Quiz || model("Quiz", QuizSchema);
