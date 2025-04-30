import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  fullName: String,
  kindeId: String,
  email: { type: String, unique: true },
  picture: String,
  role: String,
});

export const User = models.User || model('User', UserSchema);
