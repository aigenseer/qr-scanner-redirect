/**
 * Coded By : aigenseer
 * Copyright 2020, https://github.com/aigenseer
 */
declare global {
    interface Window { qrscannerredirect: any; }
}

export default class Properties {
    
    public static getDefaultSettings(){
        return {
            force: false,
            disableButton: false,
            openNewTab: true,
            primaryColor: '#000',
            primaryContrastText: '#fff',
            titleSelectDevice: 'Select device',
            titlePermissionFailed: 'Permission failed',
            contentPermissionFailed: 'Your browser has no permission for the camera. Please activate the permission.',
            titleWaitPermission: 'Wait for your permission',
            titleScanQRCode: 'QR-Code-Scanner',
            titleRedirect: 'Forwarding',
            contentRedirect: 'Would you like to redirect to the url "%URL"',

            failedReadQRImage: 'No QR-Code found on the picture.',
            noPermissionDialogTitle: 'No camera permission',
            noPermissionDialogText: 'Your browser has no access to your camera. You can still upload a photo to use the QR scanner.',
            noPermissionDialogButton: 'Choose a photo',

        }
    }

    public static init(appName: string){
        //set the settings paramter
        if(window.hasOwnProperty(appName)){
            window.qrscannerredirect.settings = Object.assign(Properties.getDefaultSettings(), window.qrscannerredirect.settings);
        }else{
            window.qrscannerredirect = {
                settings: Properties.getDefaultSettings()
            }
        }
        window.qrscannerredirect.app_name = appName;
    }

    public static getFailedReadQRImage(): string
    {
        return window.qrscannerredirect.settings.failedReadQRImage;
    }

    public static getNoPermissionDialogTitle(): string
    {
        return window.qrscannerredirect.settings.noPermissionDialogTitle;
    }

    public static getNoPermissionDialogText(): string
    {
        return window.qrscannerredirect.settings.noPermissionDialogText;
    }

    public static getNoPermissionDialogButton(): string
    {
        return window.qrscannerredirect.settings.noPermissionDialogButton;
    }

    public static getTitlePermissionFailed(): string
    {
        return window.qrscannerredirect.settings.titlePermissionFailed
    }

    public static getContentPermissionFailed(): string
    {
        return window.qrscannerredirect.settings.contentPermissionFailed
    }

    public static isButtonDisabled(): boolean
    {
        return window.qrscannerredirect.settings.disableButton
    }

    public static getContentRedirect(): string
    {
        return window.qrscannerredirect.settings.contentRedirect;
    }

    public static getTitleRedirect(): string
    {
        return window.qrscannerredirect.settings.titleRedirect;
    }

    public static getTitleWaitPermission(): string
    {
        return window.qrscannerredirect.settings.titleWaitPermission;
    }

    public static getTitleScanQRCode(): string
    {
        return window.qrscannerredirect.settings.titleScanQRCode;
    }

    public static getTitleSelectDevice(): string
    {
        return window.qrscannerredirect.settings.titleSelectDevice;
    }

    public static getPrimaryColor(): string
    {
        return window.qrscannerredirect.settings.primaryColor;
    }

    public static getPrimaryContrastText(): string
    {
        return window.qrscannerredirect.settings.primaryContrastText;
    }

    public static isForce(): Boolean
    {
        return window.qrscannerredirect.settings.force;
    }

    public static isOpenNewTab(): Boolean
    {
        return window.qrscannerredirect.settings.openNewTab;
    }

}