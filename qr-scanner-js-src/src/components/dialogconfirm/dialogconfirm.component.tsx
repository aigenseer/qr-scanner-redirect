/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Clear, Check } from '@material-ui/icons';


export interface Props {
  title: string;
  text: string;
  onClose(answer: boolean): void;
}

export default class DraggableDialog extends React.Component<Props, any>{

  state = {
    open: true
  };

  /**
   * [constructor]
   * @param {any} props
   */
  constructor(props: any){
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * [hanbdling function to close the dialog and deliver the answer to the parent component]
   * @type {boolean} answer
   */
  public handleClose(answer: boolean = false): void{
    this.setState({ open: false });
    this.props.onClose(answer);
  };

  render() {
    return (
        <Dialog
          open={this.state.open}
          onClose={()=>this.handleClose()}
          className={'dialogconfirm'}
          maxWidth={'md'}
        >
          <DialogTitle>{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>this.handleClose()}>
              <Clear fontSize="large" />
            </Button>
            <Button onClick={()=> this.handleClose(true)}>
              <Check fontSize="large" />
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}
