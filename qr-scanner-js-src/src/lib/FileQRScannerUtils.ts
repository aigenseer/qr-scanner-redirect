import FileUtils from "./FileUtils";
import QRReader from "./QRReader";

/**
 * Coded By : aigenseer
 * Copyright 2021, https://github.com/aigenseer
 */
export default class FileQRScannerUtils {

    private static MAX_SCANS: number = 15;

    public static scanFile(file: File): Promise<string|null>
    {
        return FileQRScannerUtils.readImageFromFile(document.createElement("canvas"), file);
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



}