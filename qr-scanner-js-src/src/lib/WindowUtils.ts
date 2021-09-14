export default class WindowUtils {
    

    /**
    * [if device mobile or desktop]
    * @return {Boolean}
    */
   public static isMobile(): boolean{
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
   }

    public static isIOSMobile(): boolean{
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

}