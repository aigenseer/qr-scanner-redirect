<?php
/**
 * Plugin Name:       QR Scanner Redirect
 * Plugin URI:        https://github.com/aigenseer/qr-scanner-redirect
 * Description:       Wordpress web qr-scanner with redirect function
 * Version:           1.0.4
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Viktor Aigenseer
 * Author URI:        https://github.com/aigenseer/
 * License:           GPL v3
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.de.html
 */

define('QSR_PLUGIN_FILE_URL', dirname( __FILE__ , 1 ));
define('QSR_PLUGIN_URL', plugins_url('/qr-scanner-redirect/plugin'));
define('QSR_NAME', 'QR-Scanner-Redirect');
define('QSR_PREFIX', 'qrscannerredirect');
define('QSR_SHORTCODE_NAME', 'qr-scanner-redirect');
define('QSR_WIDGET_DESCRIPTION', 'Qr-scanner with redirect funktion');

include "class/tabs.class.php";

$qsr_tabs = new QSR_Tabs(QSR_PREFIX, QSR_NAME, [
  'settings' => (object)[
    'title' => 'Settings',
    'include' => QSR_PLUGIN_FILE_URL.'/settings.php'
  ]
]);


include "sql/pluginsettings.class.php";
$qsr_pluginsettings = new QSR_PluginSettings(QSR_PREFIX, (object)[
  'settings' => (object)[
    'force' => (object)[
      'title' => 'Force redirect',
      'type' => 'boolean',
      'defaultvalue' => 0,
      'description' => 'Force the redirect to the scanned url without confirm'
    ],
    'disableButton' => (object)[
      'title' => 'Diable button',
      'type' => 'boolean',
      'defaultvalue' => 0,
      'description' => 'if you disable the button, you can open the dialog with the class name "qrscannerredirect-open".'
    ],
    'titleScanQRCode' => (object)[
      'title' => 'Title for the QR-Code-Scanner',
      'type' => 'string',
      'defaultvalue' => 'QR-Code-Scanner'
    ],
    'titleRedirect' => (object)[
      'title' => 'Title for forwarding',
      'type' => 'string',
      'defaultvalue' => 'Forwarding'
    ],
    'contentRedirect' => (object)[
      'title' => 'Confirmation message',
      'type' => 'long-string',
      'defaultvalue' => 'Would you like to redirect to the url "%URL"',
      'placeholder' => 'Would you like to redirect to the url "%URL"',
      'description' => 'URL path can be set with %URL'
    ],
    'titleSelectDevice' => (object)[
      'title' => 'Title for choose the device camera',
      'type' => 'string',
      'defaultvalue' => 'Select device'
    ],
    'titleWaitPermission' => (object)[
      'title' => 'Title for wait permission',
      'type' => 'string',
      'defaultvalue' => 'Wait for your permission'
    ],
    'titlePermissonFailed' => (object)[
      'title' => 'Title for permission failed',
      'type' => 'string',
      'defaultvalue' => 'Permission failed'
    ],
    'contentPermissonFailed' => (object)[
      'title' => 'Content for permission failed',
      'type' => 'long-string',
      'defaultvalue' => 'Your browser has no permission for the camera. Please activate the permission.',
      'placeholder' => 'Your browser has no permission for the camera. Please activate the permission.'
    ]
  ]
]);
$qsr_pluginsettings->createTable();

function qsr_init_menu() {
    add_menu_page(QSR_NAME, QSR_NAME, "manage_options", QSR_PREFIX, "qsr_display", QSR_PLUGIN_URL.'/img/icon.png');
}
add_action("admin_menu", "qsr_init_menu");

function qsr_display(){
  global $qsr_tabs;
	$qsr_tabs->display();
}

include "shortcode.php";
include "widget.php";
include "metaboxes.php";
