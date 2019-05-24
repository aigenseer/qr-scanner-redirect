/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */
export default class VideoStream {

  private DEFAULT_VIDEO_SETTINGS: object
  private stream: any|null = null
  private lastOption: object

  constructor(){
    this.DEFAULT_VIDEO_SETTINGS = this.isMobile()? { facingMode: { exact: "environment" } } : { facingMode: "user" };
  }

   /**
    * [if device mobile or desktop]
    * @return {Boolean}
    */
   public isMobile(): boolean{
     return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
   }

  /**
   * [deliver list of devices]
   * @return {Promise} Array<any>
   */
  public getDevices(): Promise<Array<any>>{
    return new Promise((resolve: any, reject: any)=>{
      navigator.mediaDevices.enumerateDevices().then((list: Array<any>) =>{
        let devices = list.filter(e => e.kind === 'videoinput').sort((a: any, b: any) => {
          if(a.label.includes('back') && b.label.includes('front')){
            return -1
          }else if(a.label.includes('front') && b.label.includes('back')){
            return 1
          }
          return 0;
        });
        resolve(devices);
      }).catch(reject);
    });
  }

  /**
   * [close all track from streams]
   */
  public close(): void{
    if(this.stream!=null){
      this.stream.getTracks().forEach((track: any) => track.stop())
      this.stream=null;
    }
  }

  /**
   * [deliver stream]
   * @type {object} option [if the option are change, then close all streams and create a new]
   * @return {Promise} object
   */
  public getStream(option: object = this.DEFAULT_VIDEO_SETTINGS): Promise<object>{
    return new Promise((resolve: any, reject: any)=>{
      if(this.stream!=null && this.lastOption == option){
        resolve(this.stream);
      }else{
        if(this.stream!=null && this.lastOption != option){
          this.close();
        }
        this.lastOption = option
        navigator.mediaDevices.getUserMedia({video: option}).then((stream: any) => {
          this.stream = stream;
          resolve(stream);
        }).catch(reject)
      }
    });
  }

}//class
