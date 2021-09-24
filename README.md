# WP QR Scanner Redirect
This WordPress plugin contains a web Qr scanner with a redirect function. It is also possible to embed a custom QR code for a website via a shortcode.
With the user-friendly administrator interface, it is possible to make extensive settings such as the texts, forwarding functions and the color of this plugin.
In addition to the usual QR code scanners, the plug-in offers support for HTTP connections with the alternative of the file QR scanner.

### Demo & Documentation
[Demo](https://aigenseer.github.io/qr-scanner-redirect/)

### Using the QR Scanner Redirect
Place the shortcode `[qr-scanner-redirect]` in your templates.

#### Alternative start the plugin
You can also start the scanner with the function `window.qrscannerredirect.open()` or add the class `qr-scanner-redirect-open` to any element and click on it.

### Using the QR Generator 
Place the shortcode `[qr-generator id="1" size="300"]` in your templates
Require parameter:
* id: Id of the page

Optional parameter:
* size: Pixel size of the QR code

### Supported Platforms
* PC: Safari, Opera, Edge, Chrome, Firefox
* Android/IOS: Safari, Opera, Edge, Chrome, Firefox

## Installation

#### Steps
1. Upload the folder `qr-scanner-redirect/plugin` to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress


## Update Javascript-File
1. Go to the folder `qr-scanner-redirect/qr-scanner-js-src` or `qr-scanner-redirect/qr-generator-js-src`
2. Run `npm install` & make your changes
3. Build the new file with `npm run build`

### License
[GNU GPLv3](https://github.com/aigenseer/qr-scanner-redirect/blob/master/LICENSE "GNU GPLv3")
