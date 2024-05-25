// backend/app.js
// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const todoSchema = new mongoose.Schema({
  text: String,
  description: String,
  status: { type: String, enum: ['completed', 'incomplete', 'ongoing'], default: 'incomplete' },
});

const Todo = mongoose.model('Todo', todoSchema);

app.post('/todos', async (req, res) => {
  const { text, description, status } = req.body;
  const newTodo = new Todo({
    text,
    description,
    status
  });
  await newTodo.save();
  res.json(newTodo);
});

app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(id, { status }, { new: true });
  res.json(updatedTodo);
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.sendStatus(204);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
