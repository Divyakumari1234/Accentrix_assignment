import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true },
    entity: { type: String, default: '' },
    entityId: { type: mongoose.Schema.Types.ObjectId },
    metadata: { type: Object, default: {} }
  },
  { timestamps: true }
);

export default mongoose.model('Activity', activitySchema);
