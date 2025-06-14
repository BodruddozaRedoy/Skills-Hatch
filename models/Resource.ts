import mongoose, { Schema, model, models } from "mongoose";

const ResourceSchema = new Schema({
  lesson: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ["pdf", "link", "image"], required: true },
  url: { type: String, required: true },
});

export default models.Resource || model("Resource", ResourceSchema);
