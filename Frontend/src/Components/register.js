import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { Form, Button } from 'react-bootstrap'


const baseUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export default function register({registerCallback}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const submit= await 
    axios.post(`${baseUrl}/auth/register?key=${apiKey}`,{
      username,
      password
    })
    .then((res)=>{
      console.log(res)
      alert(res.data.message)
      registerCallback()
    })
    .catch((err)=>{
      alert(err.response.data.message)
    })
  }


  return (
    <Fragment>
      <h1>Register</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  )
}