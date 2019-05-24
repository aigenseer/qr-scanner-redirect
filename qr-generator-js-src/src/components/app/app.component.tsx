/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */
import * as React from "react";
import './app.component.css';
import JsxParser from 'react-jsx-parser'
import qrCode from "qrcode-npm";

export interface AppProps { compiler: string; framework: string; url: string}

export default class App extends React.Component<AppProps, {}> {

    constructor(props: any){
      super(props);
    }

    /**
     * [create the qr code]
     * @type {[type]}
     */
    public render() {
      var qr = qrCode.qrcode(4, 'M');
      qr.addData(this.props.url);
      qr.make();
      let image = <JsxParser jsx={qr.createImgTag(4)} />
      return (<div>{image}</div>);
    }
}
