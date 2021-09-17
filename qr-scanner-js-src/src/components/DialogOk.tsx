/**
 * Coded By : aigenseer
 * Copyright 2020, https://github.com/aigenseer
 */
import React , { useState, useEffect }  from 'react';
import Dialog                           from '@material-ui/core/Dialog';
import DialogTitle                      from '@material-ui/core/DialogTitle';
import { Check }                        from '@material-ui/icons';
import DialogContent                    from '@material-ui/core/DialogContent';
import DialogActions                    from '@material-ui/core/DialogActions';
import DialogContentText                from '@material-ui/core/DialogContentText';
import Button                           from '@material-ui/core/Button';


export interface IDialogOkProps {
    open: boolean;
    title: string;
    text: string;
    onClose(): void;
}

export default function DialogOk(props: IDialogOkProps) {
    const [open, setOpen]   = useState(props.open);
    const [title, setTitle] = useState<IDialogOkProps["title"]>(props.title);
    const [text, setText]   = useState<IDialogOkProps["text"]>(props.text);

    useEffect(() => setTitle(props.title), [props.title]);
    useEffect(() => setText(props.text),   [props.text]);
    useEffect(() => setOpen(props.open),   [props.open]);

    /**
     * [handling function to close the dialog and deliver the answer to the parent component]
     * @type {boolean} answer
     */
    function handleClose(): void
    {
        setOpen(false);
        props.onClose();
    }

    return (
        <Dialog
          open={open}
          onClose={()=> handleClose()}
          maxWidth={'md'}
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{text}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              <Check fontSize="large" />
            </Button>
          </DialogActions>
        </Dialog>
      );
    
}