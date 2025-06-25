const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
};

exports.addTodo = async (req, res) => {
  const todo = await Todo.create(req.body);
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  await Todo.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Deleted' });
};

exports.toggleTodo = async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
};

exports.updateTodoTitle = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    todo.title = title;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

