import * as mongoose from 'mongoose';

export const VideoSchema = new mongoose.Schema({
  name: String,
  user: String,
  class: String,
});
