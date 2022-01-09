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

import useStyles from './Styles';
import { register } from '../../redux/actions/auth';
import { CustomSnackBar, NavBar } from '..';
import { hasToken } from '../../utils/auth';
const Register = () => {
  const classes = useStyles();

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(credentials));
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
        />
      )}
      <NavBar />
      <Container maxWidth="sm" align="center">
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" className={classes.title}>
            Register
          </Typography>

          <Container maxWidth="xs" align="center">
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              spacing={2}
            >
              <Grid item>
                <TextField
                  type="text"
                  required
                  variant="outlined"
                  label="Name"
                  size="small"
                  fullWidth
                  value={credentials.name}
                  onChange={(e) =>
                    setCredentials({ ...credentials, name: e.target.value })
                  }
                />
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
                  label="Password"
                  size="small"
                  fullWidth
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
              </Grid>

              <Grid item>
                <TextField
                  type="password"
                  required
                  variant="outlined"
                  label="Confirm Password"
                  size="small"
                  fullWidth
                  value={credentials.confirmPassword}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item>
                <Button type="submit" className={classes.button}>
                  Register
                </Button>
              </Grid>
            </Grid>
          </Container>
        </form>
      </Container>
    </>
  );
};

export default Register;
