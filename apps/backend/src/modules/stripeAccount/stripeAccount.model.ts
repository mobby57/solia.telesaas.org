import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface IStripeAccount extends Document {
  // Define stripeAccount fields here
  accountId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const StripeAccountSchema = new Schema<IStripeAccount>(
  {
    accountId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const StripeAccountModel = model<IStripeAccount>('StripeAccount', StripeAccountSchema);
