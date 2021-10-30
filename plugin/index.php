<?php
/**
 * Plugin Name:       QR Scanner Redirect
 * Plugin URI:        https://github.com/aigenseer/qr-scanner-redirect
 * Description:       Wordpress web qr-scanner with redirect function
 * Version:           1.2.2
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Viktor Aigenseer
 * Author URI:        https://github.com/aigenseer/
 * License:           GPL v3
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.de.html
 */

define('QSR_PLUGIN_FILE_URL', dirname( __FILE__ , 1 ));
define('QSR_PLUGIN_PATH', '/qr-scanner-redirect/');
define('QSR_PLUGIN_URL', plugins_url(QSR_PLUGIN_PATH));
define('QSR_NAME', 'QR-Scanner-Redirect');
define('QSR_PREFIX', 'qrscannerredirect');
define('QSR_SHORTCODE_NAME_SCANNER', 'qr-scanner-redirect');
define('QSR_SHORTCODE_NAME_GENERATOR', 'qr-generator');
define('QSR_SHORTCODE_NAME_METABOX', 'qr-generator-metabox');
define('QSR_WIDGET_DESCRIPTION', 'Qr-scanner with redirect funktion');

include "class/tabs.class.php";

$qsr_tabs = new QSR_Tabs(QSR_PREFIX, QSR_NAME, [
    'settings' => (object)[
        'title' => 'Settings'
    ],
    'language' => (object)[
        'title' => 'Language'
    ],
    'advanced' => (object)[
        'title' => 'Advanced'
    ]
]);
$qsr_tabs->addScripts();



include "sql/pluginsettings.class.php";
$qsr_pluginsettings = new QSR_PluginSettings(QSR_PREFIX, (object)[
    'settings' => (object)[
        'force' => (object)[
            'title' => 'Force redirect',
            'type' => 'boolean',
            'defaultvalue' => 0,
            'description' => 'Force the redirect to the scanned url without confirm.'
        ],
        'disableButton' => (object)[
            'title' => 'Diable button',
            'type' => 'boolean',
            'defaultvalue' => 0,
            'description' => 'if you disable the button, you can also start the scanner with the function `window.qrscannerredirect.open()` or add the class `qr-scanner-redirect-open` to any element and click on it.'
        ],
        'openNewTab' => (object)[
            'title' => 'Open new tab',
            'type' => 'boolean',
            'defaultvalue' => 1,
            'description' => 'Open new tab with the url.'
        ],
        'primaryColor' => (object)[
            'title' => 'Primary color',
            'type' => 'color',
            'defaultvalue' => '#000000',
            'placeholder' => 'Your browser has no permission for the camera. Please activate the permission.'
        ],
        'primaryContrastText' => (object)[
            'title' => 'Primary contrast text color',
            'type' => 'color',
            'defaultvalue' => '#ffffff',
            'placeholder' => 'Your browser has no permission for the camera. Please activate the permission.'
        ]
    ],
    'language' => (object)[
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
            'description' => 'URL path can be set with %URL.'
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
        'titlePermissionFailed' => (object)[
            'title' => 'Title for permission failed',
            'type' => 'string',
            'defaultvalue' => 'Permission failed'
        ],
        'contentPermissionFailed' => (object)[
            'title' => 'Content for permission failed',
            'type' => 'long-string',
            'defaultvalue' => 'Your browser has no permission for the camera. Please activate the permission.',
            'placeholder' => 'Your browser has no permission for the camera. Please activate the permission.'
        ],
        'failedReadQRImage' => (object)[
            'title' => 'Failed to read QR image',
            'type' => 'string',
            'defaultvalue' => 'No QR-Code found on the picture.'
        ],
        'noPermissionDialogTitle' => (object)[
            'title' => 'No permission dialog title',
            'type' => 'string',
            'defaultvalue' => 'No camera permission'
        ],
        'noPermissionDialogText' => (object)[
            'title' => 'No permission dialog text',
            'type' => 'string',
            'defaultvalue' => 'Your browser has no access to your camera. You can still upload a photo to use the QR scanner.'
        ],
        'noPermissionDialogButton' => (object)[
            'title' => 'No permission dialog button',
            'type' => 'string',
            'defaultvalue' => 'Choose a photo'
        ],
    ],
    'advanced' => (object)[
        'qsrstyle' => (object)[
            'title' => 'QR Scanner Redirect Style',
            'style' => 'width: 80%; min-height: 500px;',
            'type' => 'long-string',
            'defaultvalue' => file_get_contents(plugin_dir_path( __FILE__ ) . '/default/qsrstyle.default.css')
        ],
        'qgjson' => (object)[
            'title' => 'QR Generator Default Style',
            'style' => 'width: 80%; min-height: 500px;',
            'type' => 'long-string',
            'defaultvalue' => '{}',
            'description' => 'You can configure a personal JSON setting here <a href="https://qr-code-styling.com/" target="_blank" >https://qr-code-styling.com/</a>'
        ],
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

include "include/shortcode.php";
include "include/widget.php";
include "include/metaboxes.php";
