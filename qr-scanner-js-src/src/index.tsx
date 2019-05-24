/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */
/// <reference path='../custom.d.ts'/>
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from './components/app/app.component';
declare global {
    interface Window { qrscannerredirect: any; }
}
const APP_NAME = 'qrscannerredirect';
const rootElement = document.getElementById(APP_NAME)
const defaultSettings = {
  force: false,
  disableButton: false,
  titleSelectDevice: 'Select device',
  titlePermissonFailed: 'Permission failed',
  contentPermissonFailed: 'Your browser has no permission for the camera. Please activate the permission.',
  titleWaitPermission: 'Wait for your permission',
  titleScanQRCode: 'QR-Code-Scanner',
  titleRedirect: 'Forwarding',
  contentRedirect: 'Would you like to redirect to the url "%URL"'
}

//set the settings paramter
if(window.hasOwnProperty(APP_NAME)){
  window.qrscannerredirect.settings = Object.assign(defaultSettings, window.qrscannerredirect.settings);
}else{
  window.qrscannerredirect = {
    settings: defaultSettings
  }
}
window.qrscannerredirect.app_name = APP_NAME;


ReactDOM.render(
    <App compiler="TypeScript" framework="React" />, rootElement
);
