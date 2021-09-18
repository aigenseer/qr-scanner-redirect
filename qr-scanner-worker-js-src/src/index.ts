/// <reference lib="WebWorker" />
import QRReader from "../../qr-scanner-js-src/src/lib/QRReader";

export type {};
declare const self: Worker;

self.onmessage = function(e) {
    if(typeof e.data[0] !== "object" || e.data[0].constructor != ImageData
    ){
        self.postMessage(null);
    }else{
        let imageData = (e.data[0] as ImageData);
        let data = QRReader.readUint8ClampedArray(imageData.data, imageData.width, imageData.height);
        self.postMessage(data);
    }
};

