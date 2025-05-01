import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: String,
    kindeId: String,
    email: { type: String, unique: true },
    picture: String,
    role: String,
    bio: String,
    socialLinks: Object,
    points: Number,
    badges: Array,
    completedCourses: Array,
    currentCourses: Array,
    progress: [
      {
        courseId: String,
        completedLessons: Array,
        completionPercent: Number,
      },
    ],
    quizResults: [
      {
        quizId: String,
        score: Number,
        takenAt: String,
      },
    ],
    assignments: [
      {
        assignmentId: String,
        submittedAt: String,
        grade: String,
      },
    ],
    notifications: [
      {
        message: String,
        read: Boolean,
        sentAt: String,
      },
    ],
    activityLog: [
      {
        type: String, //(login, course_completed, quiz_taken)
        details: Object,
        timestamp: String,
      },
    ],
    comments: Array,
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
