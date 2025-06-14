import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    kindeId: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    picture: { type: String },
    role: {
      type: String,
      enum: ["admin", "student", "instructor"],
      default: "student",
    },
    bio: { type: String, default: "" },
    socialLinks: [
      {
        title: String,
        link: String,
      },
    ],
    points: { type: Number, default: 0, required: true },
    badges: { type: [String], default: [] },
    completedCourses: { type: [String], default: [] },
    currentCourses: { type: [String], default: [] },
    progress: [
      {
        courseId: { type: String },
        completedLessons: { type: [String], default: [] },
        completionPercent: { type: Number, default: 0 },
      },
    ],
    quizResults: [
      {
        quizId: { type: String },
        score: { type: Number },
        takenAt: { type: Date },
      },
    ],
    assignments: [
      {
        assignmentId: { type: String },
        submittedAt: { type: Date },
        grade: { type: String },
      },
    ],
    notifications: [
      {
        message: { type: String },
        read: { type: Boolean, default: false },
        sentAt: { type: Date },
      },
    ],
    activityLog: [
      {
        type: { type: String }, // e.g., login, course_completed, quiz_taken
        details: { type: Object },
        timestamp: { type: Date },
      },
    ],
    comments: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
