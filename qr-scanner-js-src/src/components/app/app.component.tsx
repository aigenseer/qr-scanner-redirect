/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */
import * as React from "react";
import './app.component.css';
import Dialogcamera from '../dialogcamera/dialogcamera.component';
import Dialogconfirm from '../dialogconfirm/dialogconfirm.component';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import lightBlue from '@material-ui/core/colors/lightBlue';
import logo from '../../assets/qrcode.svg';


const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: lightBlue
  },
  typography: {
    useNextVariants: true,
  }
});


export interface AppProps { compiler: string; framework: string; }

interface StateLayout {
    msg: any;
    open: boolean;
}

export default class App extends React.Component<AppProps, {}> {

    state: StateLayout = {
      msg: null,
      open: false
    }

    /**
    * [constructor]
    * @param {Unkown} props
    */
    constructor(props: any){
      super(props);
      this.openDialog = this.openDialog.bind(this);
      this.onCloseDialog = this.onCloseDialog.bind(this);
    }

    /**
     * [create addEventListener for other element to start this app]
     */
    componentDidMount(): void{
      let buttons = document.getElementsByClassName(window.qrscannerredirect.app_name+'-open');
      for (let i = 0; i < buttons.length; i++) {
          buttons[i].addEventListener("click", this.openDialog);
      }
    }

    /**
     * [componentWillReceiveProps update the state open]
     * @param  {any} nextProps
     */
    componentWillReceiveProps(nextProps: any): void{
      if (nextProps.open !== this.state.open) {
        this.setState({ open: nextProps.open });
      }
    }

    /**
     * [check if the string is a url]
     * @type {String} str
     */
    private validURL(str: string): boolean{
      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return !!pattern.test(str);
    }

    /**
     * [on close confirm the dialog to redirect to other page]
     * @type {boolean} answer
     * @type {string} url
     */
    private onCloseDialogConfirm(answer: boolean, url: string): void{
      if(answer || window.qrscannerredirect.settings.force){
        location.href = url;
      }else{
        this.setState({msg: null, open: false});
      }
    }

    /**
     * [change the state open to true]
     */
    public openDialog(): void{
      this.setState({ open : true});
    }

    /**
     * [if the result is a url, then open the Dialogconfirm component]
     * @type {String|null} result
     */
    public onCloseDialog(result: string|null = null): void{
      if(result!=null){
        if(this.validURL(result)){
          this.setState({
            msg: <Dialogconfirm title={window.qrscannerredirect.settings.titleRedirect} text={window.qrscannerredirect.settings.contentRedirect.replace('%URL', result)} onClose={(answer => this.onCloseDialogConfirm(answer, result))} />
          })
        }
      }else{
        this.setState({open: false})
      }
    }


    public render() {
      if(this.state.msg!=null) {
        return this.state.msg;
      }
      let button = (<Button onClick={this.openDialog}>
        <img src={logo} alt="qrcode" className="qrcode-image" />
      </Button>);
      if(window.qrscannerredirect.settings.disableButton){
        button = null
      }

      const content = this.state.open? <Dialogcamera open={true} onClose={this.onCloseDialog} />: null

      return (
        <MuiThemeProvider theme={theme}>
          {this.state.msg}
          {button}
          {content}
        </MuiThemeProvider>
      );
    }
}
