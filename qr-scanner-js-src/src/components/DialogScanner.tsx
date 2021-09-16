import React , { useState }           from 'react';

import { makeStyles }                 from '@material-ui/core/styles';
import Button                         from '@material-ui/core/Button';
import { CameraFront }                from '@material-ui/icons';
import Dialog                         from '@material-ui/core/Dialog';

import { DialogTitle, DialogActions } from './DialogParts';
import VideoStream                    from '../lib/VideoStream';
import Properties                     from "../lib/Properties";
import QRScanner                      from './QrScanner';
import DialogSelect                   from './DialogSelect';

/**
 * Coded By : aigenseer
 * Copyright 2020, https://github.com/aigenseer
 */
const useStyles = makeStyles({
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
    color: "white !important"
  },
  dialogActions: {
    minHeight: "64px",
    zIndex: 1,
    background: "rgba(0, 0, 0, 1)",
    justifyContent: "center !important",
    position: "fixed"
  }
});

export interface IDialogcameraProps {
    videoStream: VideoStream
    onClose(result: string|null): void;
}

var  selectedDeviceID = "";
export default function DialogScanner(props: IDialogcameraProps) { 
  const classes                        = useStyles();
  const DEVICE_SIZE                    = props.videoStream.getDevices().length;
  // const SHOWDIALOGACTIONS              = DEVICE_SIZE > 0;
  const SHOWDIALOGACTIONS              = true;
  const [mediaStream,  setMediaStream] = useState<MediaStream>(props.videoStream.getCurrentStream());
  const [openDialogSelect, setOpenDialogSelect] = useState<boolean>(false);


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

  function getActionFooter() {
    if(!SHOWDIALOGACTIONS){
      return null;
    } 

    return (<DialogActions className={classes.dialogActions} >
              <Button onClick={handleChangeSelect} color="primary">
                <CameraFront fontSize="large" className={classes.dialogColor} />
              </Button>
            </DialogActions>)
  }

  

  return (
    <Dialog
          fullScreen={true}
          open={true}
          onClose={() => handleClose()}
        >
            <DialogTitle className={classes.dialogColor} onClose={() => handleClose()} >{Properties.getTitleScanQRCode()}</DialogTitle>
            <div className={classes.content} >
              <QRScanner mediaStream={mediaStream} onFetchCode={handleClose} />
            </div>
            <DialogSelect open={openDialogSelect} title={Properties.getTitleSelectDevice()} options={getDialogSelectOptions()} onSelect={e => onSelectDevice(e)} />
            {getActionFooter()}
        </Dialog>
  );
}
