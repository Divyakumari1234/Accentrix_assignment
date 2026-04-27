import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    contactName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: '' },
    industry: { type: String, default: '' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export default mongoose.model('Client', clientSchema);
