/**
 * Coded By : aigenseer
 * Copyright 2020, https://github.com/aigenseer
 */
import React , { useState, ReactElement }               from 'react';
import { MuiThemeProvider, makeStyles, createTheme }    from '@material-ui/core/styles';
import Properties                                       from "../lib/Properties";
import StringUtils                                      from "../lib/StringUtils";
import logo                                             from '../assets/qrcode.svg';

import DialogCamera                                     from './DialogScanner';
import DialogConfirm                                    from './DialogConfirm';
import DialogOk                                          from './DialogOk';
import DialogFileQRScanner                              from './DialogFileQRScanner';

import Button                                           from '@material-ui/core/Button';
import VideoStream                                      from '../lib/VideoStream';
import Dialog                                           from '@material-ui/core/Dialog';
import MuiDialogTitle                                   from '@material-ui/core/DialogTitle';
import clsx                                             from 'clsx';


const useStyles = makeStyles({
  root: {
    width: 500,
  },
  img: {
    width: "4em"
  }
});


export default function App() {
  const classes               = useStyles();
  const [content, setContent] = useState<null|ReactElement>(null);
  const [msg,     setMsg]     = useState<null|ReactElement>(null);

  const theme = createTheme({
        palette: {
            primary: {
                main: Properties.getPrimaryColor(),
                contrastText: Properties.getPrimaryContrastText(),
            }
        },
  });


  let visibleButton : ReactElement|null = null;
  if(!Properties.isButtonDisabled()){
    visibleButton = (<Button className={clsx("qsr-open-button")} onClick={() => openDialogCamera()}><img src={logo} className={classes.img} alt="qrcode" /></Button>);
  }

  window.qrscannerredirect.open = () => openDialogCamera();
  window.qrscannerredirect.openFileReader = () => fileReaderDialog();


  // setTimeout(() => {
  //     fileReaderDialog()
  // }, 1000);

  function fileReaderDialog()
  {
      setMsg(<DialogFileQRScanner onClose={url => {
          setMsg(null);
          onCloseDialog(url);
      }} />)
  }

  function openDialogCamera() {
    if(content === null){
      openPermissionMsg();
      VideoStream.getInstance().then(videoStream => {
        setMsg(null);
        setContent(<DialogCamera videoStream={videoStream} onClose={onCloseDialog} />)
      }).catch(err => {
          console.log(err)
        showPermissionMsg()
      });
    }
  }

  function showPermissionMsg() {
    setMsg(<DialogOk open={true} title={Properties.getTitlePermissionFailed()} text={Properties.getContentPermissionFailed()} onClose={fileReaderDialog}/>);
  }

  function closeDialogCamera() {
    VideoStream.destory();
    setContent(null);
  }

  function openPermissionMsg() {
    setMsg(<Dialog
        className={clsx("qsr-dialog-root", "qsr-dialog-permission-msg-root")}
        open={true}
        disableEscapeKeyDown={true}
        onClose={e => false}
    >
        <MuiDialogTitle className={clsx("qsr-dialog-title", "qsr-dialog-permission-msg-title")}  >{Properties.getTitleWaitPermission()}</MuiDialogTitle>
    </Dialog>)
  }

   /**
     * [on close confirm the dialog to redirect to other page]
     * @type {boolean} answer
     * @type {string} url
     */
    async function onCloseDialogConfirm(answer: boolean, url: string)
    {
        if(answer){
            redirectToUrl(url);
        }else{
            setMsg(null);
            // setContent(null);
            // VideoStream.destory();
        }
    }

    function redirectToUrl(url: string){
        if(Properties.isOpenNewTab() && typeof window.open === 'function'){
            // @ts-ignore
            window.open(url, '_blank').focus();
            return
        }
        window.location.href = url;
    }
  

   /**
     * [if the result is a url, then open the Dialogconfirm component]
     * @type {String|null} url
     */
    function onCloseDialog(url: string|null = null): void{
        if(url!=null){
            if(StringUtils.validURL(url) || StringUtils.isValidHttpUrl(url)){
                if(Properties.isForce()){
                  redirectToUrl(url);
                }else{
                  const TEXT = Properties.getContentRedirect().replace('%URL', url);
                  setContent(null);
                  setMsg(<DialogConfirm 
                    title={Properties.getTitleRedirect()} 
                    text={TEXT} 
                    onClose={((answer: boolean) => onCloseDialogConfirm(answer, url))} />)  
                }                
            }
        }else{
          closeDialogCamera();
        }
    }

  return (
      <MuiThemeProvider theme={theme}>
          {msg}
          {visibleButton}
          {content}
      </MuiThemeProvider>
  );
}
