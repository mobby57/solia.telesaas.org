import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface IDonation extends Document {
  // Define donation fields here
  donorName: string;
  amount: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const DonationSchema = new Schema<IDonation>(
  {
    donorName: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export const DonationModel = model<IDonation>('Donation', DonationSchema);
