/**
 * Coded By : aigenseer
 * Copyright 2020, https://github.com/aigenseer
 */
import React , { useState, useEffect }  from 'react';
import Dialog                           from '@material-ui/core/Dialog';
import DialogTitle                      from '@material-ui/core/DialogTitle';
import { Clear, Check }                 from '@material-ui/icons';
import DialogContent                    from '@material-ui/core/DialogContent';
import DialogActions                    from '@material-ui/core/DialogActions';
import DialogContentText                from '@material-ui/core/DialogContentText';
import Button                           from '@material-ui/core/Button';


export interface IDialogMsgProps {
    title: string;
    text: string;
    onClose(answer: boolean): void;
}

export default function DialogMsg(props: IDialogMsgProps) {
    const [open, setOpen]   = useState<boolean>(true);
    const [title, setTitle] = useState<IDialogMsgProps["title"]>(props.title);
    const [text, setText]   = useState<IDialogMsgProps["text"]>(props.text);

    useEffect(() => setTitle(props.title), [props.title]);
    useEffect(() => setText(props.text),   [props.text]);

    /**
     * [hanbdling function to close the dialog and deliver the answer to the parent component]
     * @type {boolean} answer
     */
    function handleClose(answer: boolean = false): void
    {
        setOpen(false);
        props.onClose(answer);
    };


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
          <Button onClick={()=> handleClose()}>
              <Clear fontSize="large" />
            </Button>
            <Button onClick={()=> handleClose(true)}>
              <Check fontSize="large" />
            </Button>
          </DialogActions>
        </Dialog>
      );
    
}