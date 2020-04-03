import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
  name: String,
});

CourseSchema.index({ name: 1 }, { unique: true }); // teacher or student
