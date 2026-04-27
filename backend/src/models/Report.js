import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ['activity', 'project', 'client'], default: 'activity' },
    value: { type: Number, default: 0 },
    generatedAt: { type: Date, default: Date.now },
    notes: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Report', reportSchema);
