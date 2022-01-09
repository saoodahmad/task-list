import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';

import { fetchMyTasks } from '../../redux/actions/task';
import MuiAlert from '@material-ui/lab/Alert';

import useStyles from './Styles';
import { login } from '../../redux/actions/auth';
import { CustomSnackBar, NavBar } from '..';
import { hasToken } from '../../utils/auth';
const Login = () => {
  const classes = useStyles();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials));
    console.log(credentials);
  };

  const { loading, data, error } = useSelector((state) => state.auth);

  const history = useHistory();

  return (
    <>
      {hasToken() && history.push('/')}
      {loading === true && (
        <CustomSnackBar message="Please wait" severity="info" />
      )}
      {loading === false && error && (
        <CustomSnackBar message={error} severity="error" />
      )}
      {loading === false && data && (
        <CustomSnackBar
          message={data.message}
          severity="success"
          redirect="/"
          refetch={fetchMyTasks}
        />
      )}
      <NavBar />
      <Container maxWidth="sm" align="center">
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" className={classes.title}>
            Login
          </Typography>

          <Container maxWidth="xs" align="center">
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              spacing={2}
            >
              <Grid item>
                <MuiAlert severity="info"> Login to view and add task</MuiAlert>
              </Grid>

              <Grid item>
                <TextField
                  type="email"
                  required
                  variant="outlined"
                  label="Email"
                  size="small"
                  fullWidth
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                />
              </Grid>

              <Grid item>
                <TextField
                  type="password"
                  required
                  variant="outlined"
                  label="Email"
                  size="small"
                  fullWidth
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
              </Grid>

              <Grid item>
                <Button type="submit" className={classes.button}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </Container>
        </form>
      </Container>
    </>
  );
};

export default Login;
