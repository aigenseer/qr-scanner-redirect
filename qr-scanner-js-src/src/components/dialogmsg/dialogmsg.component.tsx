/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import './dialogmsg.component.css';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

export interface Props {
  title: string;
  text: string;
  onClose(): void;
}

export default class Dialogmsg extends React.Component<Props, any>{

  public static defaultProps = {
    text: '',
    title: '',
    onClose: ()=>{}
  }

  state = {
    open: true,
  }

  /**
   * [constructor]
   * @param {any} props
   */
  constructor(props: any){
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * [handling function to close the component and run the onClose property from the the parent component]
   */
  public handleClose(){
    this.setState({ open: false });
    this.props.onClose();
  }


  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        className={'dialogmsg'}
      >
        <DialogTitle>{this.props.title}</DialogTitle>
        <DialogContent className={'content'} >
          <DialogContentText>
              {this.props.text}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

}
