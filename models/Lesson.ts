import mongoose, { Schema, model, models } from "mongoose";

const LessonSchema = new Schema(
  {
    chapterId: Number,
    courseId: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    textContent: String,
    videoContent: String,
    resources: String,
  },
  { timestamps: true }
);

export default models.Lesson || model("Lesson", LessonSchema);
