const express = require('express');

const router = express.Router();

// import controllers
const todo = require('../controller/todo');
const restrict = require('../middlewares/restrict');

// routes list
router.get('/get',restrict, todo.getTodo);
router.post('/create',restrict, todo.createTodo);
router.post('/update',restrict, todo.updateTodo);
router.post('/delete',restrict, todo.deleteTodo);

// export router
module.exports = router;
