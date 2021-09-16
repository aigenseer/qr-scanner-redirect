/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */
import React, { useEffect }    from 'react';
import { BrowserQRCodeReader } from '@zxing/library';
import './css/qrscanner.css';

interface IQrScannerProps{
    mediaStream: MediaStream;
    onFetchCode(code: string): any;
}

const browserQRCodeReader = new BrowserQRCodeReader();
const UPDATE_INTERVAL     = 500;

export default function QrScanner(props:IQrScannerProps) {
    let video:           HTMLVideoElement|null = null;
    let canvas:          HTMLCanvasElement;
    let context:         CanvasRenderingContext2D|null;


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
        setTimeout(() => {

            if(video != null && context!=null && typeof context.drawImage == 'function') {
                try {
                    context.drawImage(video, 0, 0);
                    browserQRCodeReader.decodeFromImage(undefined, canvas.toDataURL("image/png")).then((result: any)=>{
                        props.onFetchCode(result.text);
                    }).catch(() => {

                    })
                    fetchQrCode();
                } catch (err) {
                    console.log(err);
                }
            }
        }, UPDATE_INTERVAL);
    }



    return (<div className="qrscanner">
        <div className="ocrloader">
            <em/>
            <span/>
        </div>
        <video  ref={e => video = e} autoPlay={true} loop muted playsInline={true}  />
        <canvas style={{'display': 'none'}}  ref={e => canvas = e as HTMLCanvasElement} width={640} height={480} />
    </div>)

}