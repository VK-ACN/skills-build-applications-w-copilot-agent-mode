import mongoose, { Schema } from 'mongoose';
const ActivitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['running', 'walking', 'strength', 'cycling'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceMiles: { type: Number, min: 0 },
    note: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now }
});
export const Activity = mongoose.model('Activity', ActivitySchema);
