const ErrorResponse = require('../error-handler/errorResponse');
const {
  createTask,
  deleteTask,
  updateTask,
  fetchTaskByAuthor,
} = require('../services/task');

exports.addTask = async (req, res, next) => {
  try {
    const { title, description, date } = req.body;

    const { _id: authorID, name: author } = req.user;

    await createTask(title, description, date, author, authorID);

    res.status(201).json({
      success: true,
      message: 'Task Added!',
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { taskID } = req.params;

    await deleteTask(taskID);

    res.status(200).json({
      success: true,
      message: 'Task Deleted!',
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const { taskID } = req.params;

    await updateTask(taskID, { title, description });

    res.status(200).json({
      success: true,
      message: 'Task Updated!',
    });
  } catch (error) {
    return next(error);
  }
};

exports.getMyTasks = async (req, res, next) => {
  try {
    const { _id: authorID } = req.user;

    const tasks = await fetchTaskByAuthor(authorID);

    if (tasks.length == 0) {
      return next(new ErrorResponse('No task found', 404));
    }
    res.status(200).json({
      success: true,
      tasks: tasks,
      message: 'Task Fetch Success!',
    });
  } catch (error) {
    return next(error);
  }
};
