import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import { CustomSnackBar, EditTask, NavBar, ViewTask } from '..';
import { fetchMyTasks } from '../../redux/actions/task';
import { hasToken } from '../../utils/auth';

const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const Task = ({ task }) => {
  const [openViewModal, setOpenViewModal] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenViewModal = () => {
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
  };

  const handleOpenEditModal = () => {
    setOpenViewModal(false);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };
  return (
    <Grid item xs={12} md={3}>
      <Card>
        <CardContent>
          <Grid container direction="column" alignItems="center" spacing={1}>
            <Grid item>
              <Typography variant="h6">{task.title}</Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={3}
              >
                <Grid item xs={4}>
                  <Typography variant="body" color="textSecondary">
                    {' '}
                    Deadline
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="textPrimary">
                    {new Date(task.date).getDate()}{' '}
                    {month[new Date(task.date).getMonth()]}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                size="small"
                onClick={handleOpenViewModal}
                color="primary"
              >
                Detail
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ViewTask
        open={openViewModal}
        handleClose={handleCloseViewModal}
        task={task}
        handleOpenEdit={handleOpenEditModal}
      />
      <EditTask
        open={openEditModal}
        handleClose={handleCloseEditModal}
        task={task}
      />
    </Grid>
  );
};
const TaskList = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  useEffect(() => {
    if (hasToken()) {
      dispatch(fetchMyTasks());
    } else {
      history.push('/login');
    }
  }, [dispatch, history]);

  const { loading, data, error } = useSelector((state) => state.task);
  return (
    <>
      {loading === true && <CustomSnackBar message="loading" severity="info" />}
      {loading === false && error && (
        <CustomSnackBar message={error.message} severity="error" />
      )}
      {loading === false &&
        data &&
        (data.tasks ? (
          <CustomSnackBar message={data.message} severity="success" />
        ) : (
          <CustomSnackBar
            message={data.message}
            severity="success"
            refetch={fetchMyTasks}
          />
        ))}
      <NavBar />
      <Container maxWidth="md" align="center">
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          spacing={1}
        >
          {data &&
            data.tasks &&
            data?.tasks.map((task) => <Task task={task} />)}
          {data && !data.tasks && (
            <CustomSnackBar message="please wait" severity="info" />
          )}
        </Grid>
      </Container>
    </>
  );
};

export default TaskList;
