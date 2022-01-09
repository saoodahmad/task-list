import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/actions/task';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';

const AddTask = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const [task, setTask] = useState({
    title: 'Please Provide Title',
    description: 'Please Provide Description',
    date: new Date(),
  });

  const handleAddTask = () => {
    dispatch(addTask(task));
      handleClose();
    
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            label="description"
            type="text"
            fullWidth
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
          <TextField
            type="date"
            label="Last Date"
            fullWidth
            autoFocus
            value={task.date}
            onChange={(e) => setTask({ ...task, date: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTask}>Add Task</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTask;
