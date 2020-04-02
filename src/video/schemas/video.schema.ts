import * as mongoose from 'mongoose';

export const VideoSchema = new mongoose.Schema({
  url: String,
  videoName: String,
  uploader: String,
  course: String,
});
