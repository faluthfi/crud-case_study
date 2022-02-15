import React, { Fragment, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios"

const baseUrl = process.env.REACT_APP_API_URL;


const EditTodo = ({ todo, passedToken, refresh }) => {
  const [description, setDescription] = useState(todo.description);
  const [show, setShow] = useState(false)


  //edit description function

  const updateDescription = async e => {
    e.preventDefault();
    try {
      const response = await
        axios.post(`${baseUrl}/todo/update`,
          {
            id: todo.id,
            description
          },
          {
            headers: {
              Authorization: passedToken
            },
          })
          .then((res) => {
            console.log(res)
            setShow(false)
            refresh()
            alert(res.data.message)
          })
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-warning"
        onClick={() => { setShow(true) }}
      >
        Edit
      </button>

      {/* 
        id = id10
      */}
      <Modal
        id={`id${todo.id}`}
        show={show}
        onHide={() => { setShow(false) }}
        onClick={() => setDescription(todo.description)}
      >
        <Modal.Header>
          <h4 class="modal-title">Edit Todo</h4>
          <button
            onClick={()=>{setShow(false)}}
          >
            &times;
          </button>
        </Modal.Header>

        <Modal.Body>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            class="btn btn-warning"
            data-dismiss="modal"
            onClick={updateDescription}
          >
            Edit
          </button>
          <button
            type="button"
            class="btn btn-danger"
            data-dismiss="modal"
            onClick={()=>{setShow(false)}}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default EditTodo;
