# QR Scanner Redirect
Wordpress web qr-scanner with redirect function

### InstallationInstallation

#### Add to wordpress
Simple Using
1. Upload the folder `qr-scanner-redirect/plugin` to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Place `the shortcode [qr-scanner-redirect]` in your templates

Alternative Using
You can also start the scanner with the function `window.qrscannerredirect.open()`

### Update Javascript-File
1. Go to the folder `qr-scanner-redirect/qr-scanner-js-src` or `qr-scanner-redirect/qr-generator-js-src`
2. Run `npm install` & make your changes
3. Build the new file with `npm run build`

### License
[GNU GPLv3](https://github.com/aigenseer/qr-scanner-redirect/blob/master/LICENSE "GNU GPLv3")
