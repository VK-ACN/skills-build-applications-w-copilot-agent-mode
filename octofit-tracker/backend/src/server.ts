import express from 'express';
import './config/database.js';
import apiRoutes from './routes/api.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'Octofit backend is running', baseUrl });
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  console.log(`Base URL: ${baseUrl}`);
});

export { app, baseUrl, port };
