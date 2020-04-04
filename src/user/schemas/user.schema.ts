import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  courses: [String],
});

UserSchema.index({ email: 1 }, { unique: true });
