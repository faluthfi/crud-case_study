const jwt = require('jsonwebtoken');
const pool = require('../db');
const bcrypt = require('bcrypt');
const api=require('./apikey');

//REGISTER
const register = async (req, res) => {
  if (!req.body.username || !req.body.password || req.body.username.includes(" ") || req.body.password.includes(" ")) {
    return res.status(400).json({
      "status": "error",
      "message": "username or password is empty",
    })
  }
  try {
    const user = await pool.query(
      "SELECT username FROM users WHERE username=$1;",
      [req.body.username.toLowerCase()]
    )
    if (user.rowCount) {
      return res.status(400).json({
        "status": "error",
        "message": "username already exist",
      })
    }
  }
  catch (err) {
    return res.status(400).json({
      "status": "error",
      "message": err,
    })
  }

  try {
    const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
    const registerQuery = await pool.query(
      "INSERT INTO users (username,password) VALUES($1,$2) RETURNING *",
      [req.body.username.toLowerCase(), encryptedPassword]
    )
    const increaseAPICount=await api.increaseCount(res.currentKey);
    return res.status(200).json({
      "status": "success",
      "message": "username registered successfully!",
    })
  }
  catch (err) {
    return res.status(400).json({
      "status": "error",
      "message": err,
    })
  }
}

//LOGIN+GENERATE TOKEN
const generateToken = (user) => {
  //Payload
  const payload = {
    id: user.id,
    username: user.username,
  };

  //Secret Key
  const secretKey = process.env.SECRET_KEY;
  return jwt.sign(payload, secretKey);
};

const login = async (req, res) => {
  let user = {};
  //Find user by username in DB
  try {
    const findOne = await pool.query(
      "SELECT * FROM users WHERE username=$1;",
      [req.body.username.toLowerCase()]
    );
    if (!findOne.rowCount) {
      return res.status(400).json({
        "status": "error",
        "message": "Invalid Username",
      })
    };
    user = findOne.rows[0];
  } catch (err) {
    return res.status(400).json({
      "status": "error",
      "message": err,
    })
  }

  //Hash Sync Password
  try {
    const isPasswordValid=bcrypt.compareSync(req.body.password,user.password)
    if(!isPasswordValid){
      return res.status(400).json({
        "status":"error",
        "message":"Invalid Password"
      })
    }
  } catch (err) {
    return res.status(400).json({
      "status": "error",
      "message": err,
    })
  }
  
  const increaseAPICount=await api.increaseCount(res.currentKey);
  //Return id,username and generate token when all is passed
  return res.status(200).json({
    "status":"success",
    "message":"Login Successfull",
    "data":{
      "id":user.id,
      "username":user.username,
      accessToken:generateToken(user),
    }
  })
}

module.exports={
register,
login
}