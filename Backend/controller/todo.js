const pool = require('../db');

//GET TODO BY USER ID
const getTodo = async (req, res) => {
  try {
    const todos = await pool.query(
      "SELECT * FROM todo WHERE user_id=$1",
      [req.user.id]
    )
    return res.status(200).json({
      "status": "success",
      "message": "data query success",
      "data": todos.rows
    })
  } catch (err) {
    return res.status(400).json({
      "status": "error",
      "message": err,
    })
  }
}
//CREATE TODO BY USER
const createTodo = async (req, res) => {
  try {
    const todo = await pool.query(
      "INSERT INTO todo (description,user_id) VALUES($1,$2) RETURNING *",
      [req.body.description, req.user.id]
    )
    return res.status(200).json({
      "status": "success",
      "message": "todo created",
      "data": todo.rows[0]
    })
  } catch (err) {
    return res.status(400).json({
      "status": "error",
      "message": err,
    })
  }
}
//UPDATE TODO BY ID
const updateTodo = async (req, res) => {
  try {
    const todo = await pool.query(
      "SELECT * FROM todo WHERE id=$1",
      [req.body.id]
    )
    if (req.user.id !== todo.rows[0].user_id) {
      return res.status(400).json({
        "status": "error",
        "message": "only respective owner can update",
      })
    }
  } catch (err) {
    return res.status(400).json({
      "status": "error",
      "message": err,
    })
  }

  try {
    const update = await pool.query(
      "UPDATE todo SET description=$1, lastUpdated=CURRENT_TIMESTAMP WHERE id=$2 RETURNING *",
      [req.body.description, req.body.id]
    )
    return res.status(200).json({
      "status": "success",
      "message": "todo updated",
      "data": update.rows[0]
    })
  } catch (err) {
    return res.status(400).json({
      "status": "error",
      "message": err,
    })
  }

}
//DELETE TODO BY ID
const deleteTodo = async (req, res) => {
  try {
    const todo = await pool.query(
      "SELECT * FROM todo WHERE id=$1",
      [req.body.id]
    )
    if (req.user.id !== todo.rows[0].user_id) {
      return res.status(400).json({
        "status": "error",
        "message": "only respective owner can delete",
      })
    }
  } catch (err) {
    return res.status(400).json({
      "status": "error",
      "message": err,
    })
  }

  try {
    const removal = await pool.query(
      "DELETE FROM todo WHERE id=$1",
      [req.body.id]
    )
    return res.status(200).json({
      "status": "success",
      "message": "todo deleted",
    })
  } catch (err) {
    return res.status(400).json({
      "status": "error",
      "message": err,
    })
  }

};

module.exports={
  deleteTodo,
  updateTodo,
  createTodo,
  getTodo
};