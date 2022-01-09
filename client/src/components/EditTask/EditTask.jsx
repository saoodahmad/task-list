import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateMyTask } from '../../redux/actions/task';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
const EditTask = ({ open, handleClose, task }) => {
  const [editTask, setEditTask] = useState({ ...task });

  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateMyTask(task._id, editTask));
    handleClose();
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            value={editTask.title}
            onChange={(e) =>
              setEditTask({ ...editTask, title: e.target.value })
            }
            label="title"
          />

          <TextField
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            value={editTask.description}
            onChange={(e) =>
              setEditTask({ ...editTask, description: e.target.value })
            }
            label="Description"
          />

          <TextField
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            value={new Date(editTask.date).toLocaleDateString()}
            label="Deadline"
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleUpdate}>
            Update Task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditTask;
