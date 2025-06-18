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
