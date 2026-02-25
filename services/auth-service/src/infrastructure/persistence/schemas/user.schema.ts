import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    refreshTokenHash: { type: String },
  },
  { timestamps: true },
);

export const UserModel = model('User', userSchema);
