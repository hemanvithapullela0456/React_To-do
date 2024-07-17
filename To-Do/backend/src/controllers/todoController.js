const Todo = require("../models/todoModel");
const User = require("../models/userModel");

async function addTask(req, res) {
  console.log("Reached Add Task");

  const { task, userId } = req.body;
  console.log(userId);

  const existingUser = await User.findOne({ _id: userId });
  if (existingUser) {
    const newTask = new Todo({
      userId: userId,
      task: task,
      completed: false,
      starred: false,
      deleted: false,
      date: new Date(),
    });

    await newTask.save();
    res.send({
      status: true,
      message: "Task added successfully",
    });
  } else {
    res.send({
      status: false,
      message: "No such user found!",
    });
  }
}

async function markCompleted(req, res) {
  console.log("Reached mark completed task");

  const { taskID, userId } = req.body;

  const markCompleteStatus = await Todo.findOneAndUpdate(
    { _id: taskID, userId: userId },
    { $set: { completed: true } }
  );

  if (markCompleteStatus) {
    res.send({
      status: true,
      message: "Task successfully marked as completed.",
    });
  } else {
    res.send({
      status: false,
      message: "No such task found!",
    });
  }
}

async function unMarkCompleted(req, res) {
  console.log("Reached un mark completed task");

  const { taskID, userId } = req.body;

  const unMarkCompletedStatus = await Todo.findOneAndUpdate(
    { _id: taskID, userId: userId },
    { $set: { completed: false } }
  );

  if (unMarkCompletedStatus) {
    res.send({
      status: true,
      message: "Task successfully unmarked as completed.",
    });
  } else {
    res.send({
      status: false,
      message: "No such task found!",
    });
  }
}

async function markStarred(req, res) {
  console.log("Reached mark starred task");

  const { taskID, userId } = req.body;

  const markStarredStatus = await Todo.findOneAndUpdate(
    { _id: taskID, userId: userId },
    { $set: { starred: true } }
  );

  if (markStarredStatus) {
    res.send({
      status: true,
      message: "Task successfully marked as starred.",
    });
  } else {
    res.send({
      status: false,
      message: "No such task found",
    });
  }
}

async function unMarkStarred(req, res) {
  console.log("Reached un mark starred task");

  const { taskID, userId } = req.body;

  const unMarkStarredStatus = await Todo.findOneAndUpdate(
    { _id: taskID, userId: userId },
    { $set: { starred: false } }
  );

  if (unMarkStarredStatus) {
    res.send({
      status: true,
      message: "Task successfully unmarked as starred.",
    });
  } else {
    res.send({
      status: false,
      message: "No such task found!",
    });
  }
}

async function deleteTask(req, res) {
  console.log("Reached deleted task");

  const { taskID, userId } = req.body;

  const deleteStatus = await Todo.findOneAndUpdate(
    { _id: taskID, userId: userId },
    { $set: { deleted: true } }
  );

  if (deleteStatus) {
    res.send({
      status: true,
      message: "Task deleted successfully.",
    });
  } else {
    res.send({
      status: false,
      message: "No such Task found!",
    });
  }
}

async function undoDelete(req, res) {
  console.log("Reached undo deleted task");

  const { taskID, userId } = req.body;

  const deleteStatus = await Todo.findOneAndUpdate(
    { _id: taskID, userId: userId },
    { $set: { deleted: false } }
  );

  if (deleteStatus) {
    res.send({
      status: true,
      message: "Task successfully restored from deletion.",
    });
  } else {
    res.send({
      status: false,
      message: "No such Task found!",
    });
  }
}

async function deleteDeletedTask(req, res) {
  // this function will finally delete the task from the database

  console.log("Reached deleteDeletedTask");

  const { userId } = req.body;

  try {
    const noOfTaskToDelete = await Todo.find({ userId: userId, deleted: true });

    if (noOfTaskToDelete.length === 0) {
      return res.send({
        status: false,
        message: "No tasks found to delete!",
      });
    } else {
      const finalDeleteStatus = await Todo.deleteMany({
        userId: userId,
        deleted: true,
      });

      if (finalDeleteStatus.deletedCount === noOfTaskToDelete.length) {
        res.send({
          status: true,
          message: "All tasks deleted successfully.",
        });
      } else {
        res.send({
          status: false,
          message: "Error deleting tasks. Not all tasks were deleted!",
        });
      }
    }
  } catch (err) {
    res.send({
      status: false,
      message: "An error occurred while deleting tasks.",
    });
  }
}

module.exports = {
  addTask,
  markCompleted,
  unMarkCompleted,
  markStarred,
  unMarkStarred,
  deleteTask,
  undoDelete,
  deleteDeletedTask,
};
