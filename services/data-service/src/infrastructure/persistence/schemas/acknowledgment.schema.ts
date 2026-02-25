import { Schema, model } from 'mongoose';

const acknowledgmentSchema = new Schema(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true, index: true },
    message: { type: String, required: true },
    version: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

export const AcknowledgmentModel = model('Acknowledgment', acknowledgmentSchema);
