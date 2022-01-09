import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    flatAppBar: {
      backgroundColor: '#FFB52E',
      boxShadow: '0px 0px 0px 0px',
      marginBottom: '50px',
    },
    container: {
      paddingBottom: '2px',
      borderBottom: '2px solid black',
    },
    button: {
      '&:hover': {
        backgroundColor: '#FFB52E',
      },
      backgroundColor: '#FFB52E',
      color: 'white',
      padding: '7px',
    },
  })
);

export default useStyles;
