/**
 * Coded By : aigenseer
 * Copyright 2021, https://github.com/aigenseer
 */
import jsQR from "jsqr";

export default class QRReader {

    public static readArrayBuffer(buffer: ArrayBuffer, width: number, height: number): string|null
    {
        return this.readUint8ClampedArray(new Uint8ClampedArray(buffer), width, height);
    }

    public static readUint8ClampedArray(buffer: Uint8ClampedArray, width: number, height: number): string|null
    {
        try {
            let code = jsQR(buffer, width, height);
            if(code !== null){
                return code.data;
            }
            return null
        }catch (err){
            console.log(err)
            return null;
        }
    }


}