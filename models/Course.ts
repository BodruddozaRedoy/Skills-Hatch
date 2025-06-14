import mongoose, { Schema, model, models } from 'mongoose';

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    ratings: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    level: { type: String, default: "" },
    language: { type: String, default: "English" },
    status: { type: String, default: "" },
    description: String,
    instructor: { type: {}, required: true },
    category: String,
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
    studentsEnrolled: [{ type: Schema.Types.ObjectId, ref: "User" }],
    reviews: [{ type: {}, default: {} }],
    progress: [{ type: {}, default: {} }],
  },
  { timestamps: true }
);

export default models.Course || model("Course", CourseSchema);
