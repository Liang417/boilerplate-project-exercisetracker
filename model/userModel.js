import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String },
  log: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Log' }],
});

export default mongoose.model('User', userSchema);
