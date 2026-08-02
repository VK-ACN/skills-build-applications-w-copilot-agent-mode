import mongoose, { Schema } from 'mongoose';
const LeaderboardEntrySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    name: { type: String, required: true, trim: true },
    score: { type: Number, default: 0 },
    activityCount: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now }
});
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', LeaderboardEntrySchema);
