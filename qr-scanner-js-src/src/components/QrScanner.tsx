/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */
import React, { useEffect }    from 'react';

import './css/qrscanner.css';
import WorkerUtils from "../lib/WorkerUtils";
import clsx from "clsx";

interface IQrScannerProps{
    mediaStream: MediaStream;
    onFetchCode(code: string): any;
}


const UPDATE_INTERVAL = 500;


export default function QrScanner(props:IQrScannerProps) {
    let video:           HTMLVideoElement|null = null;
    let canvas:          HTMLCanvasElement;
    let context:         CanvasRenderingContext2D|null;
    const worker = WorkerUtils.getQRScannerWorker();
    worker.addEventListener('message', onFetchCodeEvent, false);

    useEffect(() => {
        startDevice(props.mediaStream);
    });

    /**
     * [startDevice start]
     * @param {any} stream
     */
    function startDevice(mediaStream: MediaStream)
    {
        try {
            if(video != null){
                video = video as HTMLVideoElement;
                video.srcObject = mediaStream
                video.addEventListener( "loadedmetadata", () => {
                    if(video != null){
                        context = canvas.getContext('2d');
                        fetchQrCode();
                    }
                }, false );
            }
        } catch(err) {
            console.error(err)
        }
    }



    /**
     * [start a interval and try to catch the qr code from the canvas context.
     *  on found a qr code then return the result to the parent component ]
     */
    function fetchQrCode(){
        setTimeout(async () => {
            if(video != null && context!=null && typeof context.drawImage == 'function') {
                try {
                    context.drawImage(video, 0, 0);
                    let imageData = context.getImageData(0,0, context.canvas.width, context.canvas.height);
                    worker.postMessage([imageData]);
                } catch (err) {
                    console.log(err);
                }
            }
        }, UPDATE_INTERVAL);
    }

    function onFetchCodeEvent(e: MessageEvent){
        if(e.data !== null){
            props.onFetchCode(e.data);
        }else{
            fetchQrCode();
        }
    }

    return (<div className={clsx("qsr-scanner", "qrscanner")} >
        <div className={clsx("qsr-ocr-loader", "ocrloader")}>
            <em/>
            <span/>
        </div>
        <video className={clsx("qsr-video")} ref={e => video = e} autoPlay={true} loop muted playsInline={true}  />
        <canvas style={{'display': 'none'}}  ref={e => canvas = e as HTMLCanvasElement} width={640} height={480} />
    </div>)

}