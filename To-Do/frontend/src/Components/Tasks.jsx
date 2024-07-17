import React, { useState, useEffect, act } from "react";
import CreateTask from "./CreateTask";
import StarredIcon from "../assets/ic--round-star.png";
import StarredMark from "../assets/white-star.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTodo } from "../Store/Reducers/TodoFilterSlice";
import { toast } from "react-toastify";
import global from "../Components/Global";
function Tasks() {
  const dispatch = useDispatch();
  const apiUrl = global.REACT_APP_API_BASE_URL;
  const userInfo = useSelector((state) => state.UserSlice);
  const todoData = useSelector((state) => state.TodoFilterSlice);
  const todoList = todoData.todo.toReversed();
  const [showCreateTask, setShowCreateTask] = useState(false);
  const activeFilter = useSelector((state) => state.ActiveDeletedFilter);

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

  const taskHandler = () => {
    setShowCreateTask((prevShowCreateTask) => !prevShowCreateTask);
  };

  const toggleTaskComplete = async (taskID, status) => {
    const url = status
      ? apiUrl + "todo/unMarkComplete"
      : apiUrl + "todo/markComplete";

    try {
      const response = await axios.post(url, {
        taskID,
        userId: userInfo.userId,
      });

      fetchTodos(userInfo.userId);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleStarred = async (taskID, status) => {
    const url = status
      ? apiUrl + "todo/unMarkStarred"
      : apiUrl + "todo/markStarred";

    try {
      const response = await axios.post(url, {
        taskID,
        userId: userInfo.userId,
      });

      fetchTodos(userInfo.userId);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (taskID, status) => {
    if (status === false)
      await axios
        .post(apiUrl + "todo/deleteTask", {
          taskID,
          userId: userInfo.userId,
        })
        .then((res) => {
          if (res.data.status === true) {
            toast.success(res.data.message);
            fetchTodos(userInfo.userId);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "2-digit",
    };
    return date.toLocaleDateString("en-IN", options);
  };

  const deleteAllTaskInDeletedTasks = async () => {
    try {
      const response = await axios.post(apiUrl + "todo/deleteall", {
        userId: userInfo.userId,
      });
      if (response.data.status === true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting tasks.");
    }
  };

  return (
    <>
      <div id="tasks-main-container">
        <ul id="tasks-list">
          {todoList?.map((task) => (
            <li key={task._id}>
              <span
                className="completed-mark list-items"
                onClick={() => toggleTaskComplete(task._id, task.completed)}
              >
                <span className={task.completed ? "inner-circle" : ""}></span>
              </span>
              <span
                className={
                  task.completed
                    ? "list-content list-items list-strike"
                    : "list-content list-items"
                }
              >
                {task.task}
              </span>
              <button
                className="delete-task-btn"
                onClick={() => deleteTask(task._id, task.deleted)}
              >
                Delete
              </button>
              <span>{formatDate(task.date)}</span>
              <span
                className="starred-mark list-items"
                onClick={() => toggleStarred(task._id, task.starred)}
              >
                <img
                  src={task.starred ? StarredMark : StarredIcon}
                  alt="starred-icon"
                  className="star-icon"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div id="tasks-footer">
        <button
          id={activeFilter.isDeletedActive ? "delete-task-btn" : "add-task-btn"}
          onClick={
            activeFilter.isDeletedActive
              ? deleteAllTaskInDeletedTasks
              : taskHandler
          }
        >
          {activeFilter.isDeletedActive ? "Delete All" : "New Task"}
        </button>
      </div>
      {showCreateTask && <CreateTask />}
    </>
  );
}

export default Tasks;
