const express = require('express');

const {
  addTask,
  updateTask,
  deleteTask,
  getMyTasks,
} = require('../controllers/task');
const { requireTokenVerification } = require('../middlewares/auth');

const router = express.Router();

router.route('/add-task').post(requireTokenVerification, addTask);

router
  .route('/delete-task/:taskID')
  .delete(requireTokenVerification, deleteTask);

router.route('/update-task/:taskID').put(requireTokenVerification, updateTask);

router.route('/get-my-tasks').get(requireTokenVerification, getMyTasks);
module.exports = router;
