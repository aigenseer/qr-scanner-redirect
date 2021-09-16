/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    display: "flex",
    alignItems: "center",
    zIndex: 1,
    width: "100%",
  },
  typography: {
    width: "100%"
  },
  closeButton: {
    // position: 'absolute',
    color: theme.palette.primary.contrastText,
    marginRight: "2em"
  },
}))((props: any) => {
  const { children, classes, onClose, className } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root+' '+className+' dialogbar dialog-title'}>
      <Typography className={classes.typography} variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    justifyContent: 'space-between',
    bottom: 0,
    width: '100%',
  },
}))(MuiDialogActions);

export {
  DialogTitle,
  DialogActions
}
