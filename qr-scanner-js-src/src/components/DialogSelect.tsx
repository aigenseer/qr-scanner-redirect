/**
 * Coded By : aigenseer
 * Copyright 2020, https://github.com/aigenseer
 */
import React , { useState, useEffect }  from 'react';
import Dialog                           from '@material-ui/core/Dialog';
import DialogTitle                      from '@material-ui/core/DialogTitle';
import List                             from '@material-ui/core/List';
import ListItem                         from '@material-ui/core/ListItem';
import ListItemText                     from '@material-ui/core/ListItemText';
import clsx from "clsx";

export interface IDialogSelectProps {
    open: boolean
    title: string;
    options: Array<any>;
    onSelect(option: any|null): void;
}

export default function DialogSelect(props: IDialogSelectProps) {
    const [open, setOpen]       = useState<boolean>(props.open);
    const [options, setOptions] = useState<any[]>(props.options);

    useEffect(() => setOpen(props.open),       [props.open]);
    useEffect(() => setOptions(props.options), [props.options]);

     /**
     * [handling to close the the dialog]
     */
    function handleClose(){
        setOpen(false);
        props.onSelect(null);
    }

    /**
     * [handling function to close the dialog and deliver the select option to the parent component]
     * @type {option} any
     */
    function handleListItemClick(option: any){
        props.onSelect(option);
        handleClose();
    }    

    return (
        <Dialog
          className={clsx("qsr-dialog-root", "qsr-dialog-select-root")}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle className={clsx("qsr-dialog-title", "qsr-dialog-select-title")} >{props.title}</DialogTitle>
          <div>
            <List>
              {options.map((option: any, i: number) => (
                <ListItem className={clsx("qsr-dialog-list-item", "qsr-dialog-select-list-item")} button selected={option.selected} onClick={() => {
                  if(!option.selected){
                    handleListItemClick(option)
                  }
                }} key={i}>
                  <ListItemText className={clsx("qsr-dialog-list-item-text", "qsr-dialog-select-list-item-text")} primary={option.label} />
                </ListItem>
              ))}
            </List>
          </div>
        </Dialog>
      );
    
}