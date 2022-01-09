import { useDispatch } from 'react-redux';
import { deleteMyTask } from '../../redux/actions/task';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
const ViewTask = ({ open, handleClose, task, handleOpenEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteMyTask(task._id));
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            value={task.title}
            label="title"
            disabled
          />

          <TextField
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            value={task.description}
            label="Description"
            disabled
          />

          <TextField
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            value={new Date(task.date).toLocaleDateString()}
            label="Deadline"
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleOpenEdit}>
            Edit Task
          </Button>
          <Button color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewTask;
