import mongoose, { Schema, model, models } from "mongoose";

const ActivitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  targetId: { type: Schema.Types.ObjectId },
  metadata: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

export default models.Activity || model("Activity", ActivitySchema);
