import mongoose, { Schema, model, models } from "mongoose";

const LessonSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    content: String,
    videoUrl: String,
    resources: [{ type: Schema.Types.ObjectId, ref: "Resource" }],
    quizzes: [{ type: Schema.Types.ObjectId, ref: "Quiz" }],
  },
  { timestamps: true }
);

export default models.Lesson || model("Lesson", LessonSchema);
