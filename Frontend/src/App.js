import { useState } from 'react';
import './App.css';
import Login from './Components/login'
import Register from './Components/register'
import Todo from './Components/todo'

function App() {
  const [token, setToken] = useState('')
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  const tokenFunc = (passedVariable) => {
    return setToken(passedVariable);
  }
  const openRegister = () => {
    return setIsRegisterOpen(true)
  }
  const closeRegister = () => {
    return setIsRegisterOpen(false)
  }

  if(token){
    return(
      <Todo
        accessToken={token}
      />
    )
  }

  return (
    <>
      <Login
        passedFunction={tokenFunc}
        registerCallback={openRegister}
      />
      <br />
      <br />
      {isRegisterOpen &&
        <Register
        registerCallback={closeRegister}
        />
      }
    </>
  );
}

export default App;
