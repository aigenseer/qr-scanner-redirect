<?php
/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */

/**
 * [initialize the scanner shortcode]
 * @return String
 */
function qsr_init_cc() {
  wp_enqueue_script('qr-scanner-redirect-script',  plugins_url( '/assets/qr-scanner-redirect.js', __FILE__ ));
  wp_enqueue_script('qr-generator-script',  plugins_url( '/assets/qr-scanner-worker.js', __FILE__ ));
  global $qsr_pluginsettings;
  $id = QSR_PREFIX;
  $s = $qsr_pluginsettings->getAll('settings', true);
  $l = $qsr_pluginsettings->getAll('language', true);
  $e = ["assetURLPath" => plugins_url( '/assets/', __FILE__ )];
  $settings = json_encode((array_merge((array) $l, (array) $s, $e)));
  return <<<HTML
    <div id="{$id}" />
    <script type="application/javascript" >
      window.{$id} = {
        settings: {$settings}
      }
    </script>
HTML;
}
add_shortcode(QSR_SHORTCODE_NAME_SCANNER, 'qsr_init_cc');


/**
 * [initialize the generator shortcode]
 * @return String
 */
function qg_init_cc($atts) {
  wp_enqueue_script('qr-generator-script',  plugins_url( '/assets/qr-generator.js', __FILE__ ));
  $a = shortcode_atts(['id' => null, 'size' => null ], $atts );
  if(is_null($a['id'])){
    return '<div class="notice notice-warning"><h3>No id in shortcode '.QSR_SHORTCODE_NAME_GENERATOR.' found.</h3></div>';;
  }
  $url = get_page_link($a['id']);
  $size = $a['size'];

  return <<<HTML
    <div class="qrgenerator" data-url="{$url}" data-size="{$size}" />
HTML;
}
add_shortcode(QSR_SHORTCODE_NAME_GENERATOR, 'qg_init_cc');





?>
