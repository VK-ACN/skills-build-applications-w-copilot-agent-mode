import mongoose from 'mongoose';
import { User } from '../models/user.js';
import { Team } from '../models/team.js';
import { Activity } from '../models/activity.js';
import { Workout } from '../models/workout.js';
import { LeaderboardEntry } from '../models/leaderboard.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Workout.deleteMany({}),
            LeaderboardEntry.deleteMany({})
        ]);
        const users = await User.create([
            { name: 'Ava Morgan', email: 'ava.morgan@example.com', role: 'student' },
            { name: 'Noah Chen', email: 'noah.chen@example.com', role: 'student' },
            { name: 'Maya Patel', email: 'maya.patel@example.com', role: 'coach' },
            { name: 'Elena Rivera', email: 'elena.rivera@example.com', role: 'admin' }
        ]);
        const teams = await Team.create([
            { name: 'Peak Performers', members: [users[0]._id, users[1]._id], score: 2540 },
            { name: 'Momentum Crew', members: [users[2]._id], score: 1980 }
        ]);
        const activities = await Activity.create([
            {
                userId: users[0]._id,
                type: 'running',
                durationMinutes: 40,
                distanceMiles: 5.2,
                note: 'Morning tempo run around the lake.'
            },
            {
                userId: users[0]._id,
                type: 'strength',
                durationMinutes: 35,
                note: 'Full-body circuit with kettlebells and bands.'
            },
            {
                userId: users[1]._id,
                type: 'cycling',
                durationMinutes: 60,
                distanceMiles: 18.5,
                note: 'Endurance ride on the trail.'
            },
            {
                userId: users[2]._id,
                type: 'walking',
                durationMinutes: 25,
                distanceMiles: 1.8,
                note: 'Recovery walk after coaching session.'
            }
        ]);
        const workouts = await Workout.create([
            {
                title: 'Beginner HIIT Booster',
                category: 'Cardio',
                durationMinutes: 20,
                difficulty: 'beginner',
                description: 'A fast-paced interval workout to build cardiovascular strength.'
            },
            {
                title: 'Strength Circuit',
                category: 'Strength',
                durationMinutes: 45,
                difficulty: 'intermediate',
                description: 'Circuit style strength training with focus on core and legs.'
            },
            {
                title: 'Recovery Stretch Flow',
                category: 'Flexibility',
                durationMinutes: 15,
                difficulty: 'beginner',
                description: 'Gentle stretching and mobility sequence for recovery days.'
            }
        ]);
        await LeaderboardEntry.create([
            {
                userId: users[0]._id,
                name: users[0].name,
                score: 1240,
                activityCount: 8
            },
            {
                userId: users[1]._id,
                name: users[1].name,
                score: 980,
                activityCount: 6
            },
            {
                userId: users[2]._id,
                name: users[2].name,
                score: 760,
                activityCount: 4
            }
        ]);
        console.log('Seed the octofit_db database with test data');
        console.log(`Created ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${workouts.length} workouts, and leaderboard entries.`);
        await mongoose.disconnect();
        console.log('Database seeding complete');
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
