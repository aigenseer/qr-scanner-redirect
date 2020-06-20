import React        from 'react';
import { Markup }   from 'interweave';
import qrCode       from "qrcode-npm";


export interface IAppProps{
    url: string|null;
}

export default function App(props: IAppProps) {
  
    function createImageByUrl(url: IAppProps["url"]){
        if(url == null){
            return null;
        }
        var qr = qrCode.qrcode(4, 'M');
        qr.addData(url);
        qr.make();
        return <Markup content={qr.createImgTag(4)} />
    }

  return (
    <div> {createImageByUrl(props.url)} </div>
  );
}
