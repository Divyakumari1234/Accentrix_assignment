import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    portalName: { type: String, default: 'Accentrix Project Portal' },
    allowRegistration: { type: Boolean, default: true },
    supportEmail: { type: String, default: 'support@accentrix.local' }
  },
  { timestamps: true }
);

export default mongoose.model('Setting', settingSchema);
