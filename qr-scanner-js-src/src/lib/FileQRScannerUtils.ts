import FileUtils from "./FileUtils";
import QRReader from "./QRReader";
import WorkerUtils from "./WorkerUtils";

/**
 * Coded By : aigenseer
 * Copyright 2021, https://github.com/aigenseer
 */
export default class FileQRScannerUtils {

    private static MAX_SCANS: number = 15;

    public static scanFile(file: File): Promise<string|null>
    {
        return FileQRScannerUtils.readImageFromFilex(file);
    }

    private static readImageFromFile(canvas: HTMLCanvasElement, file: File): Promise<string|null>
    {
        return new Promise((resolve: Function, reject: Function) => {
            FileUtils.readImageFromFile(file).then(image => {
                let context = canvas.getContext('2d');
                if(context !== null){
                    let imageData: ImageData;
                    let cur = {
                        width: 175,
                        height: 175
                    }
                    let data: string|null = null
                    let i = 0;
                    do {
                        i++;
                        cur.width = cur.width * 2 < image.width?  cur.width * 2 : image.width;
                        cur.height = cur.height * 2 < image.height?  cur.height * 2 : image.height;
                        canvas.height = cur.height
                        canvas.width = cur.width
                        context.drawImage(image, 0, 0, cur.width, cur.height);
                        imageData = context.getImageData(0, 0, cur.width, cur.height);
                        data = QRReader.readUint8ClampedArray(imageData.data, imageData.width, imageData.height);
                        if(data !== null){
                            break;
                        }
                    }while ((cur.width !== image.width || cur.height !== image.height) && i < FileQRScannerUtils.MAX_SCANS)
                    resolve(data);
                }
            }).catch(err => reject(err));
        });
    }

    private static readImageFromFilex(file: File): Promise<string|null>
    {
        return new Promise((resolve: Function, reject: Function) => {
            FileUtils.readImageFromFile(file).then(image => {
                    let queue = [];
                    let cur = {
                        width: 175,
                        height: 175
                    }
                    let i = 0;
                    do {
                        i++;
                        cur.width = cur.width * 2 < image.width?  cur.width * 2 : image.width;
                        cur.height = cur.height * 2 < image.height?  cur.height * 2 : image.height;
                        queue.push(Object.assign({}, cur));
                    }while ((cur.width !== image.width || cur.height !== image.height) && i < FileQRScannerUtils.MAX_SCANS)
                    FileQRScannerUtils.loopReadImage(queue, image).then(r => resolve(r)).catch(e => reject(e));
            }).catch(err => reject(err));
        });
    }

    private static loopReadImage(queue: { width: number; height: number; }[], image: HTMLImageElement): Promise<string|null>
    {
        return new Promise((resolve: Function, reject: Function) => {
            let cur = queue.shift();
            if(cur !== undefined){
                FileQRScannerUtils.readImageFromFileWithSize(image, cur.width, cur.height).then(r => {
                    if(r !== null){
                        resolve(r);
                    }else{
                        setTimeout(() =>
                            FileQRScannerUtils.loopReadImage(queue, image).then(r => resolve(r)).catch(err => reject(err))
                        , 500);
                    }
                }).catch(err => reject(err))
            }else{
                resolve(null);
            }
        });
    }

    private static readImageFromFileWithSize(image: HTMLImageElement, width: number, height: number): Promise<string|null>
    {
        return new Promise((resolve: Function, reject: Function) => {
            let worker = WorkerUtils.getQRScannerWorker();
            let canvas = document.createElement("canvas");
            let context = canvas.getContext('2d');
            if(context !== null){
                canvas.height = height;
                canvas.width = width;
                context.drawImage(image, 0, 0, width, height);
                let imageData = context.getImageData(0, 0, width, height);

                worker.addEventListener('message', function(e) {
                    console.log("??")
                    resolve(e.data);
                }, false);
                worker.postMessage([imageData]);
            }else{
                resolve(null);
            }
        });
    }




}