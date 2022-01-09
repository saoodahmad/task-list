import {useState} from 'react';
import { AppBar, Button, Container, Grid, Toolbar } from '@material-ui/core';

import { Link, useHistory } from 'react-router-dom';

import {useDispatch} from 'react-redux';

import {logout} from '../../redux/actions/auth'
import { getToken } from '../../utils/auth';
import useStyles from './Styles';
import AddTask from '../AddTask/AddTask';


const NavBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="relative" className={classes.flatAppBar} >
      <Toolbar disableGutters>
        <Container maxWidth="md">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>Task List</Grid>
            <Grid item>
              <Menue />
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

const Menue = () => {
  let isUser = getToken();

  const classes = useStyles();

  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  }

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = (event, reason) => {
    if(reason === "backdropClick")
    {
      return 
    }
    setOpen(false);
  }

  const [open, setOpen] = useState(false);

  return (
    <Grid container direction="row" justifyContent="space-between" spacing={2}>
      <Grid item>
        {isUser ? (
          <Button size="small" className={classes.button} onClick={handleOpen}>
            Add Task
          </Button>
        ) : (
          <Link to={'/login'}>
            <Button size="small" className={classes.button}>
              Login
            </Button>
          </Link>
        )}
      </Grid>
      <Grid item>
        {isUser ? (
          <Button size="small" className={classes.button} onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link to={'/register'}>
            <Button size="small" className={classes.button}>
              Register
            </Button>
          </Link>
        )}
      </Grid>
          <AddTask open={open} handleClose={handleClose} />
    </Grid>
  );
};

export default NavBar;
