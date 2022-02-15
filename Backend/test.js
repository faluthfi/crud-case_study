const Pool = require("pg").Pool;
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')

const pool = new Pool({
  user: "postgres",
  password: "overclocks",
  host: "localhost",
  port: 5432,
  database: "crud_jc"
});

const username = 'test123'
const password = 'test'
const name='123'

const testfunc = async () => {
  const encryptedPassword = await bcrypt.hashSync(password, 10);
  const register = await pool.query(
    "INSERT INTO users (username,password) VALUES($1,$2) RETURNING *",
    [username, encryptedPassword]
  )
  console.log(register.rows[0])
};

const checkUser = async () => {
  const user = await pool.query(
    "SELECT username FROM users WHERE username=$1;",
    [username]
  )
  console.log(user)
  console.log(user.rows.length?true:false)
  console.log(user.rowCount?true:false)
}

const generateToken = (user) => {
  //Payload
  const payload = {
    id: user.id,
    username: user.username,
  };

  //Secret Key
  const secretKey = '123123123';
  return jwt.sign(payload, secretKey);
};

const login = async () => {
  let user = {};
  //Find user by username in DB
  try {
    const findOne = await pool.query(
      "SELECT * FROM users WHERE username=$1;",
      [username.toLowerCase()]
    );
    if (!findOne.rowCount) {
      return console.log("username doesnt exist!")
    };
    user = findOne.rows[0];
    console.log(user)
  } catch (err) {
    return console.log(err)
  }

  //Hash Sync Password
  try {
    const isPasswordValid=bcrypt.compareSync(password,user.password)
    if(!isPasswordValid){
      return console.log("Invalid Password")
    }
  } catch (err) {
    return console.log(err)
  }

  //Return id,username and generate token when all is passed
  return console.log(
    generateToken(user)
  )
}

const testKey=async()=>{
  const checkName = await pool.query(
    "SELECT name FROM api WHERE name=$1;",
    [name.toLowerCase()]
  )
  if (checkName.rowCount) {
    return console.log('user already exists')
  }
  const createKey = await pool.query(
    "INSERT INTO api (api_key,name) VALUES($1,$2) RETURNING *",
    [crypto.randomUUID(), name.toLowerCase()]
  )
  return console.log(createKey.rows[0])
}


// testfunc()
// checkUser()
// login()
// testKey()