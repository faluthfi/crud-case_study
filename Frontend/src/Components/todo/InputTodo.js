import React, { Fragment, useState } from "react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

const InputTodo = ({accessToken}) => {
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
        console.log(res)
        alert(res.data.message)
      })
    } catch (err) {
      console.error(err.message);
    }
  };

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
    </Fragment>
  );
};

export default InputTodo;
