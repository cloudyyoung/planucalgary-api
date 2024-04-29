import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const tokenSchema = Schema({
  accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
  refreshToken: { type: String, required: true },
  expiresIn: { type: Date, required: true },
  createdByIp: { type: String, required: true },
  status: { type: Boolean, default: true }
},
  {
    timestamps: true
  });

const Token = model('Token', tokenSchema);

export default Token;