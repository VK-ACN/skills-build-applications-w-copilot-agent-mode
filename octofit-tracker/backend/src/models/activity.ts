import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'running' | 'walking' | 'strength' | 'cycling';
  durationMinutes: number;
  distanceMiles?: number;
  note?: string;
  createdAt: Date;
}

const ActivitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['running', 'walking', 'strength', 'cycling'], required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  distanceMiles: { type: Number, min: 0 },
  note: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

export const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);
