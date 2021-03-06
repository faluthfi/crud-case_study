import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

import EditTodo from "./EditTodo";

const baseUrl = process.env.REACT_APP_API_URL;


const ListTodos = ({ accessToken }) => {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");


  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const response = await 
      axios.post(`${baseUrl}/todo/create`,
      {
        description
      },
      {
        headers:{
          Authorization:accessToken
        },
      })
      .then((res)=>{
        getTodos()
        alert(res.data.message)
      })
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (deleteid) => {
    try {
      const response = await
        axios.post(`${baseUrl}/todo/delete`,
          {
            id:deleteid
          },
          {
            headers: {
              Authorization:accessToken
            },
          })
          .then((res) => {
            alert(res.data.message)
          })
      setTodos(todos.filter(todo => todo.id !== deleteid));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await
        axios.get(`${baseUrl}/todo/get`,
          {
            headers: {
              Authorization:accessToken
            },
          })
          .then((res) => {
            setTodos(res.data.data)
          })
    } catch (err) {
      console.error(err.message);
    }
  };

  const editCallback=()=>{
    return getTodos()
  };

  useEffect(() => {
    getTodos();
  }, []);


  console.log(todos);

  return (
    <Fragment>
      <h1 className="text-center mt-5">Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo 
                todo={todo}
                passedToken={accessToken}
                refresh={editCallback} 
                />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
