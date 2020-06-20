declare global {
    interface Window { qrscannerredirect: any; }
}

export default class Properties {
    
    public static getDefaultSettings(){
        return {
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

    public static getTitlePermissonFailed(): string
    {
        return window.qrscannerredirect.settings.titlePermissonFailed
    }

    public static getContentPermissonFailed(): string
    {
        return window.qrscannerredirect.settings.contentPermissonFailed
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

    public static isForce(): Boolean
    {
        return window.qrscannerredirect.settings.force;
    }


    
    
    

    

}