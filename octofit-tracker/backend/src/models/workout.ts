import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  category: string;
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  createdAt: Date;
}

const WorkoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  description: { type: String, trim: true, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);
