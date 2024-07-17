const express = require("express");
const TodoFiltersRoutes = express.Router();

const {
  showAllTasks,
  showCompletedTasks,
  showStarredTasks,
  showTasksCreatedToday,
  showTasksCreatedWeekAgo,
  showDeletedTask,
} = require("../controllers/todoFiltersController");

TodoFiltersRoutes.post("/all", showAllTasks);
TodoFiltersRoutes.post("/completed", showCompletedTasks);
TodoFiltersRoutes.post("/starred", showStarredTasks);
TodoFiltersRoutes.post("/today", showTasksCreatedToday);
TodoFiltersRoutes.post("/week", showTasksCreatedWeekAgo);
TodoFiltersRoutes.post("/deleted", showDeletedTask);

module.exports = TodoFiltersRoutes;
