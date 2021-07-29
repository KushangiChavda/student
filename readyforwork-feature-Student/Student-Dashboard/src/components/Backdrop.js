import React from 'react';
import {Backdrop as BackdropMiUi} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#000000c4',
    color: '#fff',
  },
}));

const Backdrop = ({open = true}) => {
  const classes = useStyles();

  return (
    <BackdropMiUi className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
    </BackdropMiUi>
  );
}

export default Backdrop;
