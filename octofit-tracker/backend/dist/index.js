import express from 'express';
import './config/database.js';
import apiRoutes from './routes/api.js';
const app = express();
const port = 8000;
app.use(express.json());
app.use('/api', apiRoutes);
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
});
