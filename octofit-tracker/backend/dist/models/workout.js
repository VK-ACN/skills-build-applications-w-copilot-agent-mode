import mongoose, { Schema } from 'mongoose';
const WorkoutSchema = new Schema({
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    description: { type: String, trim: true, default: '' },
    createdAt: { type: Date, default: Date.now }
});
export const Workout = mongoose.model('Workout', WorkoutSchema);
