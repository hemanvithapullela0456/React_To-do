const express = require("express");
const TodoRoutes = express.Router();
const {
  addTask,
  markCompleted,
  unMarkCompleted,
  markStarred,
  unMarkStarred,
  deleteTask,
  undoDelete,
  deleteDeletedTask,
} = require("../controllers/todoController");

TodoRoutes.post("/addTask", addTask);

TodoRoutes.post("/markComplete", markCompleted);
TodoRoutes.post("/unMarkComplete", unMarkCompleted);

TodoRoutes.post("/markStarred", markStarred);
TodoRoutes.post("/unMarkStarred", unMarkStarred);

TodoRoutes.post("/deleteTask", deleteTask);
TodoRoutes.post("/unoDelete", undoDelete);
TodoRoutes.post("/deleteall", deleteDeletedTask);

module.exports = TodoRoutes;
