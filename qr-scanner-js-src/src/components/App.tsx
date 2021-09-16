import React , { useState, ReactElement }               from 'react';
import { MuiThemeProvider, makeStyles, createTheme } from '@material-ui/core/styles';
import blueGrey                                         from '@material-ui/core/colors/blueGrey';
import lightBlue                                        from '@material-ui/core/colors/lightBlue';

import Properties                                       from "../lib/Properties";
import StringUtils                                      from "../lib/StringUtils";
import logo                                             from '../assets/qrcode.svg';

import Dialogcamera                                     from './DialogScanner';
import Dialogconfirm                                    from './DialogConfirm';
import DialogMsg                                        from './DialogMsg';

import Button                                           from '@material-ui/core/Button';
import VideoStream                                      from '../lib/VideoStream';
import Dialog                                           from '@material-ui/core/Dialog';
import MuiDialogTitle                                   from '@material-ui/core/DialogTitle';


const theme = createTheme({
  palette: {
    primary: blueGrey,
    secondary: lightBlue
  },
});

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


  let visibleButton : ReactElement|null = null;
  if(!Properties.isButtonDisabled()){
    visibleButton = (<Button onClick={() => openDialogcamera()}><img src={logo} className={classes.img} alt="qrcode" /></Button>);
  }

  window.qrscannerredirect.open = () => openDialogcamera();


  setTimeout(() => {
      //openDialogcamera()
  }, 1000);


  function openDialogcamera() {
    if(content === null){
      openPermissionMsg();
      VideoStream.getInstance().then(videoStream => {
        setMsg(null);
        setContent(<Dialogcamera videoStream={videoStream} onClose={onCloseDialog} />)
      }).catch(err => {
          console.log(err)
        showPermissionMsg()
      });
    }   
  }

  function showPermissionMsg() {
    setMsg(<DialogMsg title={Properties.getTitlePermissonFailed()} text={Properties.getContentPermissonFailed()} onClose={() => setMsg(null)} />);        
  }

  function closeDialogcamera() {
    VideoStream.destory();
    setContent(null);
  }

  function openPermissionMsg() {
    setMsg(<Dialog
      open={true}
      disableEscapeKeyDown={true}
      onClose={e => false}
    ><MuiDialogTitle>{Properties.getTitleWaitPermission()}</MuiDialogTitle></Dialog>)
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
                  setMsg(<Dialogconfirm 
                    title={Properties.getTitleRedirect()} 
                    text={TEXT} 
                    onClose={((answer: boolean) => onCloseDialogConfirm(answer, url))} />)  
                }                
            }
        }else{
          closeDialogcamera();
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
