/**
 * Coded By : aigenseer
 * Copyright 2021, https://github.com/aigenseer
 */
import React , { useState }           from 'react';
import Button           from '@material-ui/core/Button';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Dialog           from '@material-ui/core/Dialog';
import DialogContent    from '@material-ui/core/DialogContent';
import DialogActions    from '@material-ui/core/DialogActions';
import IconButton       from '@material-ui/core/IconButton';
import CloseIcon        from '@material-ui/icons/Close';
import Typography       from '@material-ui/core/Typography';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import {AttachFile} from "@material-ui/icons";
import IOSFileDialog from "./IOSFileDialog";
import WindowUtils from "../lib/WindowUtils";
import Properties from "../lib/Properties";
import FileUtils from "../lib/FileUtils";
import FileQRScannerUtils from "../lib/FileQRScannerUtils";
import ScreenLoader from "./ScreenLoader";
import DialogOk from "./DialogOk";




const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        display: "flex",
        zIndex: 1,
    },
    typography: {
        width: "100%",
        display: "flex",
        alignItems: "center"
    },
    closeButton: {
        // position: 'absolute',

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


const useStyles = makeStyles(theme => ({
    root: {
        width: 500,
    },
    dialogActions: {
        display: 'flex',
        justifyContent: 'center'
    }
}));


export interface IDialogFileQRScannerProps {
    onClose(url: string|null): void;
}

export default function DialogFileQRScanner(props: IDialogFileQRScannerProps) {
    const classes                                 = useStyles();
    const [loading, setLoading] = useState(false);
    const [openNoQR, setOpenNoQR] = useState(false);


    function handleFileDialog(){
        FileUtils.selectFile().then(file => onScanFile(file))
    }

    function onIOSSelectFile(file: File){
        if(file !== null) onScanFile(file);
    }

    function onScanFile(file: File){
        setLoading(true);
        FileQRScannerUtils.scanFile(file).then(url => {
            setLoading(false);
            if(url !== null){
                props.onClose(url);
            }else{
                setOpenNoQR(true);
            }
        }).catch(err => {
            setLoading(false);
        });
    }

    function handleClose(){
        props.onClose(null);
    }

    return (
        <Dialog
            open={true}
        >
            <DialogTitle onClose={handleClose}>{Properties.getNoPermissionDialogTitle()}</DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>{Properties.getNoPermissionDialogText()}</Typography>
            </DialogContent>
            <ScreenLoader open={loading} />
            <DialogOk open={openNoQR} title={"Failed"} text={Properties.getFailedReadQRImage()} onClose={() => setOpenNoQR(false)} />
            <DialogActions className={classes.dialogActions} >
                {
                    WindowUtils.isIOSMobile()?
                        <IOSFileDialog onSelectFile={onIOSSelectFile} />:
                        <Button onClick={handleFileDialog} color="primary">
                            <AttachFile fontSize="large" />
                            {Properties.getNoPermissionDialogButton()}
                        </Button>
                }
            </DialogActions>
        </Dialog>
    );
}
