import React , { useState, useEffect }  from 'react';
import Dialog                           from '@material-ui/core/Dialog';
import DialogTitle                      from '@material-ui/core/DialogTitle';
import { Check }                        from '@material-ui/icons';
import DialogContent                    from '@material-ui/core/DialogContent';
import DialogActions                    from '@material-ui/core/DialogActions';
import DialogContentText                from '@material-ui/core/DialogContentText';
import Button                           from '@material-ui/core/Button';
import { makeStyles }                   from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        "> .MuiGrid-container-120 .MuiGrid-item-121": {
            display: "flex",
            justifyContent: "center"
        }
    }
});

export interface IDialogMsgProps {
    title: string;
    text: string;
    onClose(): void;
}

export default function DialogMsg(props: IDialogMsgProps) {
    const classes           = useStyles();
    const [open, setOpen]   = useState<boolean>(true);
    const [title, setTitle] = useState<IDialogMsgProps["title"]>(props.title);
    const [text, setText]   = useState<IDialogMsgProps["text"]>(props.text);

    useEffect(() => setTitle(props.title), [props.title]);
    useEffect(() => setText(props.text),   [props.text]);

     /**
     * [handling to close the the dialog]
     */
    function handleClose(){
        setOpen(false);
    }


    return (
        <Dialog
          open={open}
          onClose={handleClose}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          className={classes.root}
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{text}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary"> <Check fontSize="large" /></Button>
          </DialogActions>
        </Dialog>
      );
    
}