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
import clsx                             from "clsx";


export interface IDialogConfirmProps {
    title: string;
    text: string;
    onClose(answer: boolean): void;
}

export default function DialogConfirm(props: IDialogConfirmProps) {
    const [open, setOpen]   = useState<boolean>(true);
    const [title, setTitle] = useState<IDialogConfirmProps["title"]>(props.title);
    const [text, setText]   = useState<IDialogConfirmProps["text"]>(props.text);

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
          className={clsx("qsr-dialog-root", "qsr-dialog-confirm-root")}
          open={open}
          onClose={()=> handleClose()}
          maxWidth={'md'}
        >
          <DialogTitle className={clsx("qsr-dialog-title", "qsr-dialog-confirm-title")} >{title}</DialogTitle>
          <DialogContent className={clsx("qsr-dialog-content", "qsr-dialog-confirm-content")}>
            <DialogContentText className={clsx("qsr-dialog-content-text", "qsr-dialog-confirm-content-text")} >{text}</DialogContentText>
          </DialogContent>
          <DialogActions className={clsx("qsr-dialog-actions", "qsr-dialog-confirm-actions")}>
            <Button className={clsx("qsr-dialog-button", "qsr-dialog-confirm-button-clear")} onClick={()=> handleClose()}>
              <Clear fontSize="large" />
            </Button>
            <Button className={clsx("qsr-dialog-button", "qsr-dialog-confirm-button-check")} onClick={()=> handleClose(true)}>
              <Check fontSize="large" />
            </Button>
          </DialogActions>
        </Dialog>
      );
    
}