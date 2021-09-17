/**
 * Coded By : aigenseer
 * Copyright 2020, https://github.com/aigenseer
 */
import React , { useState }           from 'react';

import { makeStyles }                 from '@material-ui/core/styles';
import Button                         from '@material-ui/core/Button';
import { CameraFront, AttachFile }    from '@material-ui/icons';
import Dialog                         from '@material-ui/core/Dialog';

import { DialogTitle, DialogActions } from './DialogParts';
import VideoStream                    from '../lib/VideoStream';
import Properties                     from "../lib/Properties";
import QRScanner                      from './QrScanner';
import DialogSelect                   from './DialogSelect';
import WindowUtils from "../lib/WindowUtils";
import IOSFileDialog from "./IOSFileDialog";
import ScreenLoader from "./ScreenLoader";
import DialogOk from "./DialogOk";
import FileUtils from "../lib/FileUtils";
import FileQRScannerUtils from "../lib/FileQRScannerUtils";

const useStyles = makeStyles(theme => ({
  root: {
    width: 500,
  },
  content: {
    position: "relative",
    display: "flex",
    height: "100%",
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "center",
  },
  dialogColor: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  dialogActions: {
    minHeight: "64px",
    zIndex: 1,
    background: theme.palette.primary.main,
    position: "fixed",
    justifyContent: "space-around"
  },
  dialogActionsButton: {
    width: "100%",
  }
}));

export interface IDialogcameraProps {
    videoStream: VideoStream
    onClose(result: string|null): void;
}

var  selectedDeviceID = "";
export default function DialogScanner(props: IDialogcameraProps) {
  const classes                        = useStyles();
  const DEVICE_SIZE                    = props.videoStream.getDevices().length;
  const [mediaStream,  setMediaStream]          = useState<MediaStream>(props.videoStream.getCurrentStream());
  const [openDialogSelect, setOpenDialogSelect] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [openNoQR, setOpenNoQR] = useState(false);


  /**
   * [function handler to deliver the result to the parent component]
   * @type {null|string} result
   */
  function handleClose(result: null|string = null){
    props.onClose(result);
  }

   /**
   * [handling function to change the stream interface]
   */
  function handleChangeSelect(){
    switch(DEVICE_SIZE){
      case 2:
        changeDeviceByID(props.videoStream.getDevices([selectedDeviceID])[0].id);
      break;
      default:
        setOpenDialogSelect(true);
      break;
    }
  }

  /**
   * [handling function on select a stream interface]
   * @type {any|null} device
   */
  function onSelectDevice(device: any|null): void
  {
    if(device != null){
      changeDeviceByID(device.id);
    }
    setOpenDialogSelect(false);
  }

  function changeDeviceByID(deviceID: string) {
    selectedDeviceID = deviceID;
    props.videoStream.getStreamByDeviceId(selectedDeviceID).then(mediaStream => setMediaStream(mediaStream));
  }

  function getDialogSelectOptions() {
    return props.videoStream.getDevices().map(e => Object.assign(e, {selected: selectedDeviceID === e.id }));
  }

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

  function getActionFooter() {
    return (<DialogActions className={classes.dialogActions} >
              {
                WindowUtils.isIOSMobile()?
                    <IOSFileDialog onSelectFile={onIOSSelectFile} />:
                    <Button onClick={handleFileDialog} color="primary" className={classes.dialogActionsButton}>
                      <AttachFile fontSize="large" className={classes.dialogColor} />
                    </Button>
              }
              <Button onClick={handleChangeSelect} color="primary" className={classes.dialogActionsButton} >
                <CameraFront fontSize="large" className={classes.dialogColor} />
              </Button>
              <div></div>
            </DialogActions>)
  }

  return (
    <Dialog
          fullScreen={true}
          open={true}
          onClose={() => handleClose()}
        >
            <DialogTitle className={classes.dialogColor} onClose={() => handleClose()} >{Properties.getTitleScanQRCode()}</DialogTitle>
            <ScreenLoader open={loading} />
            <DialogOk open={openNoQR} title={"Failed"} text={Properties.getFailedReadQRImage()} onClose={() => setOpenNoQR(false)} />
            <div className={classes.content} >
              <QRScanner mediaStream={mediaStream} onFetchCode={handleClose} />
            </div>
            <DialogSelect open={openDialogSelect} title={Properties.getTitleSelectDevice()} options={getDialogSelectOptions()} onSelect={e => onSelectDevice(e)} />
            {getActionFooter()}
        </Dialog>
  );
}
