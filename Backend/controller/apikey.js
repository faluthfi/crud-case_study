const pool = require('../db');
const crypto = require('crypto');

//Create API KEY
const createNewKey = async (req, res) => {
  //Check if name exist
  if (!req.body.name || req.body.name.includes(" ")) {
    return res.status(400).json({
      "status": "error",
      "message": "name cant be empty"
    })
  }

  try {
    const checkName = await pool.query(
      "SELECT name FROM api WHERE name=$1;",
      [req.body.name.toLowerCase()]
    )
    if (checkName.rowCount) {
      return res.status(400).json({
        "status": "error",
        "message": "name already exist, select different name",
      })
    }
  } catch (err) {
    return res.status(400).json({
      "status": "error",
      "message": err,
    });
  }
  try {
    const createKey = await pool.query(
      "INSERT INTO api (api_key,name) VALUES($1,$2) RETURNING *",
      [crypto.randomUUID(), req.body.name.toLowerCase()]
    )
    return res.status(200).json({
      "status": "success",
      "message": "API key generated",
      "data": createKey.rows[0],
    })

  } catch (err) {
    return res.status(400).json({
      "status": "error",
      "message": err,
    });
  };
};


//Increase Count / Logging
const increaseCount = async (currentKey) => {
  try {
    const findKey = await pool.query(
      "UPDATE api SET count=$1 WHERE api_key=$2;",
      [currentKey.count+1,currentKey.api_key]
    )
    return console.log(`${currentKey.name} has just accessed the API, with total of ${currentKey.count+1} ${currentKey.count+1>1?"times":"time"}`)

  } catch (err) {
    return console.log(err)
  }
}

module.exports={
  createNewKey,
  increaseCount
}