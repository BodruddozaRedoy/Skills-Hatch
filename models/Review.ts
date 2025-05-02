import mongoose, { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true },
    comment: String,
  },
  { timestamps: true }
);

export default models.Review || model("Review", ReviewSchema);
