<?php
/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */

 /**
  * [print div tag with QSR_PREFIX as id for display the qr scanner with the js lib qr-scanner-redirect]
  * @return String
  */
function qsr_shortcodeHTML(){
  global $qsr_pluginsettings;
  $id = QSR_PREFIX;
  $settings = json_encode($qsr_pluginsettings->getAll('settings', true));
  return <<<HTML
    <div id="{$id}" />
    <script type="application/javascript" >
      window.{$id} = {
        settings: {$settings}
      }
    </script>
HTML;
}
/**
 * [initialize the shortcode]
 * @return String
 */
function qsr_init_cc() {
  wp_enqueue_script('qr-scanner-redirect-script',  plugins_url( '/assets/qr-scanner-redirect.js', __FILE__ ));
  return qsr_shortcodeHTML();
}
add_shortcode(QSR_SHORTCODE_NAME, 'qsr_init_cc');
?>
