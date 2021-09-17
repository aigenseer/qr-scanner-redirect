/**
 * Coded By : aigenseer
 * Copyright 2021, https://github.com/aigenseer
 */
import React, {useEffect, useState} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: 10,
        color: "#fff"
    }
}));

export interface IFileQrScannerProps {
    open: boolean;
}


export default function ScreenLoader(props: IFileQrScannerProps) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    useEffect(() => setOpen(props.open), [props.open]);

    return (
        <Backdrop
            open={open}
            className={classes.backdrop}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}
