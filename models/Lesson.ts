import mongoose, { Schema, model, models, mongo } from "mongoose";

const LessonSchema = new Schema(
  {
    chapterId: mongoose.Schema.Types.ObjectId,
    courseId: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    textContent: String,
    videoContent: String,
    resources: String,
  },
  { timestamps: true }
);

export default models.Lesson || model("Lesson", LessonSchema);
