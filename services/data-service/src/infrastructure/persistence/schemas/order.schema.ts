import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true, index: true },
    description: { type: String, required: true },
    version: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

export const OrderModel = model('Order', orderSchema);
