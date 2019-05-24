/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import './dialogselect.component.css';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


export interface Props {
  open: boolean
  title: string;
  options: Array<any>;
  onSelect(option: any): void;
}

export default class Dialogmsg extends React.Component<Props, any>{

  public static defaultProps = {
    title: ''
  }

  state = {
    open: true,
  }

  /**
   * [constructor]
   * @param {Object} props
   */
  constructor(props: any){
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * [on will receive props then open the dialog]
   * @param  {any} nextProps
   */
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.open !== this.state.open) {
      this.setState({ open: nextProps.open });
    }
  }

  /**
   * [handling to close the the dialog]
   */
  public handleClose(){
    this.setState({ open: false });
  }

  /**
   * [handling function to close the dialog and deliver the select option to the parent component]
   * @type {option} any
   */
  private handleListItemClick(option: any){
    this.props.onSelect(option);
    this.handleClose();
  }


  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        className={'dialogselect'}
      >
        <DialogTitle>{this.props.title}</DialogTitle>
        <div>
          <List>
            {this.props.options.map((option: any, i: number) => (
              <ListItem button selected={option.selected} onClick={() => {
                if(!option.selected){
                  this.handleListItemClick(option)
                }
              }} key={i}>
                <ListItemText primary={option.title} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }

}
