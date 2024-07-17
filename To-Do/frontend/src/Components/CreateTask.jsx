import React, { useState, useRef } from "react";
import crossBtn from "../assets/crossBtn.png";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setTodo } from "../Store/Reducers/TodoFilterSlice";
import { ToastContainer, toast } from "react-toastify";
import global from "../Components/Global";
function CreateTask() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.UserSlice);
  const [inputValue, setInputValue] = useState("");
  const refElement = useRef();
  const apiUrl = global.REACT_APP_API_BASE_URL;

  function handleInput(e) {
    setInputValue(e.target.value);
  }

  function createTaskBtn(e) {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      sendCreatedTask(inputValue);
      setInputValue("");
    } else {
      toast.error("Task cannot be empty");
    }
  }

  function cancelBtn() {
    toast.info("Cancelling");
    setInputValue("");
  }

  function closeCreateTask() {
    refElement.current.style.display = "none";
  }

  async function sendCreatedTask(typedValue) {
    try {
      const response = await axios.post(apiUrl + "todo/addTask", {
        task: typedValue,
        userId: userInfo.userId,
      });
      console.log(response);
      response.data.status
        ? toast.success(response.data.message)
        : toast.error(response.data.message);
      fetchTodos(userInfo.userId);
    } catch (error) {
      console.log(error.response ? error.response.data : "");
    }
  }

  const fetchTodos = async (userId) => {
    try {
      const response = await axios.post(apiUrl + "filters/all", {
        userId: userId,
      });
      if (response.data.status === false) {
        toast.info(response.data.message);
      } else {
        dispatch(setTodo(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="CT-main-container" ref={refElement}>
      <div>
        <div id="CT-head">
          <h3 id="CT-heading">New List</h3>
          <img
            id="CT-cross-btn"
            src={crossBtn}
            alt="Cross Button/Close Button"
            onClick={closeCreateTask}
          />
        </div>
        <section id="CT-1">
          <input
            type="text"
            value={inputValue}
            placeholder="Enter task"
            onChange={handleInput}
          />
        </section>
        <section id="CT-2">
          <button id="CT-create-btn" className="CT-btn" onClick={createTaskBtn}>
            Create Task
          </button>
          <button id="" className="CT-btn CT-cancel-btn" onClick={cancelBtn}>
            Cancel
          </button>
        </section>
      </div>
    </div>
  );
}

export default CreateTask;
