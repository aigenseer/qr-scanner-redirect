=== QR Scanner Redirect ===
Contributors: aigenseer
Tags: camera, qr, scanner, redirect, browser, wordpress, plugin
Requires at least: 3.0.1
Tested up to: 5.6.2
Requires PHP: 5.2.4
Stable tag: 4.3
License: GPLv3 or later
License URI: http://www.gnu.org/licenses/gpl-3.0.html

== Description ==

This WordPress plugin contains a web Qr scanner with a redirect function. It is also possible to embed a custom QR code for a website via a shortcode.
With the user-friendly administrator interface, it is possible to make extensive settings such as the texts, forwarding functions and the color of this plugin.
In addition to the usual QR code scanners, the plug-in offers support for HTTP connections with the alternative of the file QR scanner.

= Demo & Documentation =
[Demo](https://aigenseer.github.io/qr-scanner-redirect/)

= Using the QR Scanner Redirect =
Place the shortcode `[qr-scanner-redirect]` in your templates.

Alternative start the plugin
You can also start the scanner with the function `window.qrscannerredirect.open()` or add the class `qr-scanner-redirect-open` to any element and click on it.

= Using the QR Generator =
Place the shortcode `[qr-generator id="1" size="300"]` in your templates
Require parameter:
* id: Id of the page
Optional parameter:
* size: Pixel size of the QR code

= Supported Platforms =
* PC: Safari, Opera, Edge, Chrome, Firefox
* Android/IOS: Safari, Opera, Edge, Chrome, Firefox

= Write Me =

Do you have a problem or a new wishes?
Write me on [github](https://github.com/aigenseer/qr-scanner-redirect) or create new topic on wordpress.


== Installation ==

= Installation steps =
1. Upload the folder `qr-scanner-redirect/plugin` to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress


== Changelog ==

= 1.1.0 =
* Add Image Scan
* QR-Generator shortcode
* Add custom color settings
* Fix ios scan bug
* Fix bug to save settings
* Update js dependencies
* Save selected input camera

= 1.0.2 =
* First Version
