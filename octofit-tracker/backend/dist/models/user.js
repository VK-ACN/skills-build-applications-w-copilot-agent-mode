import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    role: { type: String, enum: ['student', 'coach', 'admin'], default: 'student' },
    createdAt: { type: Date, default: Date.now }
});
export const User = mongoose.model('User', UserSchema);
