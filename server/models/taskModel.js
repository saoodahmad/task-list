const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
  },

  author: {
    type: String,
  },

  authorID: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
