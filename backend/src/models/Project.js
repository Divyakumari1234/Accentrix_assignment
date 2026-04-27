import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: {
      type: String,
      enum: ['planned', 'in-progress', 'review', 'completed', 'blocked'],
      default: 'planned'
    },
    dueDate: { type: Date },
    budget: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
