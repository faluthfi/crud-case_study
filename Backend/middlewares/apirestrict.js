const pool = require('../db');

const needKey = async (req, res, next) => {
  const key = req.query.key;
  if (!key) {
    return res.status(400).json({
      "status": "error",
      "message": "Empty API Key",
    })
  }
  try {
    const confirm = await pool.query(
      "SELECT * FROM api WHERE api_key=$1",
      [key]
    )
    if (!confirm.rowCount) {
      return res.status(400).json({
        "status": "error",
        "message": "Invalid API Key",
      })
    }
    res.currentKey = confirm.rows[0]
    return next()
  } catch(err) {
    return res.status(400).json({
      "status": "error",
      "message": err,
    });
  }

}

module.exports={
  needKey
}