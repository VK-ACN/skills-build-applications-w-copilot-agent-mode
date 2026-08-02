import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: mongoose.Types.ObjectId[];
  score: number;
  createdAt: Date;
}

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true, trim: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  score: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export const Team = mongoose.model<ITeam>('Team', TeamSchema);
