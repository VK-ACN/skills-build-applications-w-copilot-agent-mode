import mongoose, { Schema } from 'mongoose';
const TeamSchema = new Schema({
    name: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    score: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});
export const Team = mongoose.model('Team', TeamSchema);
