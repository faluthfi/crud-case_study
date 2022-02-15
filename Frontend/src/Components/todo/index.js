import React, { Fragment } from "react";

//components

import ListTodos from "./ListTodos";

function App({accessToken}) {
  return (
    <Fragment>
      <div className="container">
        <ListTodos accessToken={accessToken}/>
      </div>
    </Fragment>
  );
}

export default App;
