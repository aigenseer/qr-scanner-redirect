

import WindowUtils from "./WindowUtils";

export interface IVideoStreamSimpleDevice{
  id:    string;
  label: string;
}

/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */
export default class VideoStream {

  private DEFAULT_MEDIATRACK_CONSTRAINTS: MediaTrackConstraints       = { facingMode: "user" };
  private stream:                         MediaStream|null            = null;
  private currentMediaTrackConstraints:   MediaTrackConstraints|null  = null;
  private devices:                        IVideoStreamSimpleDevice[]  = [];
  public static currentInstance:          VideoStream|null            = null;

  public static getInstance(): Promise<VideoStream>
  {
    return new Promise(async (resolve: any, reject: any)=>{
      try {
        if(VideoStream.currentInstance === null){
          VideoStream.currentInstance = new VideoStream();
          await VideoStream.currentInstance.setup();
        }
        resolve(VideoStream.currentInstance);        
      } catch (err) {
        VideoStream.destory();
        reject(err);
      }      
    });
  }

  public static destory(){
    if(VideoStream.currentInstance != null){
      VideoStream.currentInstance.close();
    }  
    VideoStream.currentInstance = null;
  }

  public setup(){
    return new Promise(async (resolve: any, reject: any)=>{
      try {
        if(WindowUtils.isMobile()){
          this.DEFAULT_MEDIATRACK_CONSTRAINTS = { facingMode: { exact: "environment" } };
        }
        this.devices = (await this.getMediaDeviceInfo()).map((e: MediaDeviceInfo) => ({ label: e.label.replace(/ (\(.*?\))/g, ''), id: e.deviceId }));  
        this.stream  = await this.getMediaStreamByConstraints(this.DEFAULT_MEDIATRACK_CONSTRAINTS);
        if(this.stream == null){
          throw new Error("Stream are null");
        }
        resolve();
      } catch (err) {
        reject(err);
      }      
    });    
  }  

  private getSortAndFilterMediaDeviceInfoList(mediaDeviceInfos: MediaDeviceInfo[]): MediaDeviceInfo[]
  {
    return mediaDeviceInfos.filter(e => e.kind === 'videoinput').sort((a: any, b: any) => {
      if(a.label.includes('back') && b.label.includes('front')){
        return -1
      }else if(a.label.includes('front') && b.label.includes('back')){
        return 1
      }
      return 0;
    })
  }

  /**
   * [deliver list of devices]
   * @return {Promise} Array<MediaDeviceInfo>
   */
  private getMediaDeviceInfo(): Promise<MediaDeviceInfo[]>{
    return new Promise(async (resolve: any, reject: any)=>{
      try {
        let mediaDeviceInfos = await navigator.mediaDevices.enumerateDevices();
        resolve(this.getSortAndFilterMediaDeviceInfoList(mediaDeviceInfos));
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * [close all track from streams]
   */
  public close(): void{
    if(this.stream!=null){
      this.stream.getTracks().forEach((track: MediaStreamTrack) => track.stop())
      this.stream =null;
    }
  }
  

  /**
   * [deliver stream]
   * @type {object} option [if the option are change, then close all streams and create a new]
   * @return {Promise} object
   */
  private getMediaStreamByConstraints(mediaTrackConstraints: MediaTrackConstraints): Promise<MediaStream>{
    return new Promise(async (resolve: any, reject: any)=>{
      if(this.stream!=null && this.currentMediaTrackConstraints === mediaTrackConstraints){
        resolve(this.stream);
      }else{
        try {
          if(this.stream!=null && this.currentMediaTrackConstraints !== mediaTrackConstraints){
            this.close();
          }
          this.stream                       = await navigator.mediaDevices.getUserMedia({video: mediaTrackConstraints});
          this.currentMediaTrackConstraints = mediaTrackConstraints
          resolve(this.stream);
        } catch (err) {
          reject(err);
        }
      }
    });
  }  

  public getDevices(filterIDs: String[] = []): IVideoStreamSimpleDevice[]
  {
    return this.devices.filter(device => !filterIDs.indexOf(device.id));
  } 

  public getCurrentStream(): MediaStream
  {
    return this.stream as MediaStream;
  }

  public getStreamByDeviceId(deviceID: string): Promise<MediaStream>
  {
    return new Promise(async (resolve: any, reject: any)=>{
      try {
        let mediaTrackConstraints = { deviceId: { exact: deviceID } };
        this.stream               = await this.getMediaStreamByConstraints(mediaTrackConstraints);
        resolve(this.stream);
      } catch (err) {
        reject(err);
      }      
    });    
  }



}//class
