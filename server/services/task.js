const Task = require('../models/taskModel');

exports.createTask = async (title, description, date, author, authorID) => {
  console.log(title, description, date, author, authorID);
  return await Task.create({ title, description, date, author, authorID });
};

exports.deleteTask = async (taskID) => {
  return await Task.findByIdAndDelete(taskID);
};

exports.updateTask = async (taskID, content) => {
  return await Task.findByIdAndUpdate(taskID, { ...content });
};

exports.fetchTaskByAuthor = async (authorID) => {
  return await Task.find({ authorID });
};
