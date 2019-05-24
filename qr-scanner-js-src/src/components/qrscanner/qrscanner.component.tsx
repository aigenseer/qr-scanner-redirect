/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */
import * as React from 'react';
import './qrscanner.component.css';
import { BrowserQRCodeReader } from '@zxing/library';

interface Props {
  stream: object;
  onFetchCode(code: string): any;
}

export default class QrScanner extends React.Component<Props, any> {

  public video: any
  public canvas: any
  public context: any
  public qr: any
  public UPDATE_INTERVAL: number
  public DEFAULT_VIDEO_SETTINGS: object
  public interval: any

  /**
   * [constructor]
   * @param {any} props
   */
  constructor(props: any){
    super(props);
    this.qr = new BrowserQRCodeReader();
    this.interval = null;
    this.UPDATE_INTERVAL = 500;
  }

  /**
   * [stops the interval for analyzing the video on a qr code]
   */
  private stopInterval(){
    if(this.interval != null){
      clearInterval(this.interval);
      this.interval = null;
    }
  }


  /**
   * [run the function this.stopInterval]
   */
  componentWillUnmount(){
    this.stopInterval();
  }

  /**
   * [on will receive propertys, than stop the interval and start new interval with the new stream]
   * @param  {any} nextProps
   */
  componentWillReceiveProps(nextProps: any){
    this.stopInterval();
    this.startDevice(nextProps.stream);
  }

  /**
   * [start the interval to analyzing the vidoe stream]
   */
  componentDidMount(){
    this.startDevice(this.props.stream)
  }


  /**
   * [startDevice start]
   * @param {any} stream
   */
  public async startDevice(stream: any): Promise<void>{
    try {
       if(this.video != null){
          this.video.srcObject = stream
          this.video.addEventListener( "loadedmetadata", async () => {
            if(this.video != null){
              this.context = this.canvas.getContext('2d');
              this.fetchQrCode();
            }
          }, false );
          this.video.play();
        }
    } catch(err) {
      console.error(err)
    }
  }

  /**
   * [start a interval and try to catch the qr code from the canvas context.
   *  on found a qr code then return the result to the parent component ]
   */
  public fetchQrCode(){
    this.stopInterval();
    this.interval = setInterval(() => {
      if(this.video != null && this.context!=null && typeof this.context.drawImage == 'function') {
        try {
          this.context.drawImage(this.video, 0, 0);
          this.qr.decodeFromImage(undefined, this.canvas.toDataURL("image/png")).then((result: any)=>{
            this.stopInterval();
            this.props.onFetchCode(result.text);
          }).catch(() => {

          })
        } catch (err) {
          console.log(err);
        }
      }
    }, this.UPDATE_INTERVAL)
  }

  public render() {
    return (
      <div className="qrscanner">
        <div className="ocrloader">
          <em/>
          <span/>
        </div>
        <video  ref={e => this.video = e} />
        <canvas style={{'display': 'none'}}  ref={e => this.canvas = e} width={640} height={480} />
      </div>
    );
  }

}
