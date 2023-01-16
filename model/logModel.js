import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  description: { type: String },
  duration: { type: Number },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Log', logSchema);
