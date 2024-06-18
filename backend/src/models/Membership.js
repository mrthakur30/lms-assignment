import { Schema, model } from 'mongoose';

const membershipSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['6 months', '1 year', '2 years'], default: '6 months' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Membership = model('Membership', membershipSchema);

export default Membership;
