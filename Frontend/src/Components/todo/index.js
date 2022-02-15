import React, { Fragment } from "react";

//components

import InputTodo from "./InputTodo";
import ListTodos from "./ListTodos";

function App({accessToken}) {
  return (
    <Fragment>
      <div className="container">
        <InputTodo accessToken={accessToken}/>
        <ListTodos accessToken={accessToken}/>
      </div>
    </Fragment>
  );
}

export default App;
