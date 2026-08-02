import mongoose, { Schema, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  score: number;
  activityCount: number;
  updatedAt: Date;
}

const LeaderboardEntrySchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true, trim: true },
  score: { type: Number, default: 0 },
  activityCount: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', LeaderboardEntrySchema);
