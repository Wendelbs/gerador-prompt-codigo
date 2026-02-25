import { Schema, model } from 'mongoose';

const auditSchema = new Schema(
  {
    action: { type: String, required: true },
    userId: { type: String, required: true },
    targetId: { type: String, required: true },
  },
  { timestamps: true },
);

export const AuditModel = model('Audit', auditSchema);
