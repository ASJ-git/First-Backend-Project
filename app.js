const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];
let nextId = 1;

app.get('/api/v1/tasks', (req, res) => res.json(tasks));

app.post('/api/v1/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const task = {
    id: String(nextId++),
    title,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(task);
  res.status(201).json(task);
});

app.listen(process.env.PORT || 3000);
