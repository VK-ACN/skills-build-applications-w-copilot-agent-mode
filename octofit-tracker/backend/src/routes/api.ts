import { Router } from 'express';
import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

router.get('/users', async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

router.get('/teams', async (_req, res) => {
  const teams = await Team.find().populate('members');
  res.json(teams);
});

router.post('/teams', async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.status(201).json(team);
});

router.get('/activities', async (_req, res) => {
  const activities = await Activity.find().sort({ createdAt: -1 });
  res.json(activities);
});

router.post('/activities', async (req, res) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.status(201).json(activity);
});

router.get('/workouts', async (_req, res) => {
  const workouts = await Workout.find().sort({ createdAt: -1 });
  res.json(workouts);
});

router.post('/workouts', async (req, res) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.status(201).json(workout);
});

router.get('/leaderboard', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().sort({ score: -1 });
  res.json(leaderboard);
});

router.post('/leaderboard', async (req, res) => {
  const entry = new LeaderboardEntry(req.body);
  await entry.save();
  res.status(201).json(entry);
});

export default router;
