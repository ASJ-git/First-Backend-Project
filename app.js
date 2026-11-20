import express from 'express';
import tasks from './tasks.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/v1/tasks', (req, res) => res.json(tasks));

app.post('/api/v1/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const task = {
    id: String(tasks.length + 1),
    title,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(task);
  res.status(201).json(task);
});

const PORT = process.env.PORT ?? 8000;
app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
