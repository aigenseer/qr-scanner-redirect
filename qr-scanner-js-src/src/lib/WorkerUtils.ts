import Properties from "./Properties";

export default class WorkerUtils {

    public static getQRScannerWorker(): Worker
    {
        return new Worker(Properties.getAssetURLPath()+'qr-scanner-worker.js');
    }

}