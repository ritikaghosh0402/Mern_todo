const express = require('express');
const router = express.Router();
const controller = require('../controllers/todoController');

router.get('/', controller.getTodos);
router.post('/', controller.addTodo);
router.delete('/:id', controller.deleteTodo);
router.put('/toggle/:id', controller.toggleTodo);

module.exports = router;
