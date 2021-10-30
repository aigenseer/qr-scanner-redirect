<?php
/**
 * Coded By : aigenseer
 * Copyright 2021, https://github.com/aigenseer
 */


function qsrGetInlineStyle() {
  global $qsr_pluginsettings;
  $defaultAdvanced = $qsr_pluginsettings->getDefaultData('advanced');
  $advanced = $qsr_pluginsettings->getAll('advanced', true);
  if(strcmp($defaultAdvanced->qsrstyle->defaultvalue, $advanced->qsrstyle) === 0){
    return "";
  }
  return <<<HTML
  <style type="text/css">{$advanced->qsrstyle}</style>
HTML;
}


function qsrQGJson() {
  global $qsr_pluginsettings;
  $defaultAdvanced = $qsr_pluginsettings->getDefaultData('advanced');
  $advanced = $qsr_pluginsettings->getAll('advanced', true);
  if(strcmp($defaultAdvanced->qgjson->defaultvalue, $advanced->qgjson) === 0){
    return "{}";
  }
  return $advanced->qgjson;
}

/**
 * [initialize the scanner shortcode]
 * @return String
 */
function qsr_init_cc() {
  wp_enqueue_script('qr-scanner-redirect-script',  plugins_url( '../assets/qr-scanner-redirect.js', __FILE__ ));
  global $qsr_pluginsettings;
  $id = QSR_PREFIX;
  $s = $qsr_pluginsettings->getAll('settings', true);
  $l = $qsr_pluginsettings->getAll('language', true);
  $e = ["assetURLPath" => plugins_url( '../assets/', __FILE__ )];
  $settings = json_encode((array_merge((array) $l, (array) $s, $e)));
  add_action( 'wp_head', 'qsr_inline_style' );
  $styleTag = qsrGetInlineStyle();
  return <<<HTML
    {$styleTag}
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
  global $qsr_pluginsettings;
  $advanced = $qsr_pluginsettings->getAll('advanced', true);




  wp_enqueue_script('qr-generator-script',  plugins_url( '../assets/qr-generator.js', __FILE__ ));
  $a = shortcode_atts(['id' => null, 'size' => null, 'json-options' => '{}' ], $atts );
  if(is_null($a['id'])){
    return '<div class="notice notice-warning"><h3>No id in shortcode '.QSR_SHORTCODE_NAME_GENERATOR.' found.</h3></div>';;
  }

  $url = get_page_link($a['id']);
  $size = $a['size'];
  $jsonOptions = esc_html(json_encode((array_merge((array) json_decode($advanced->qgjson), (array) json_decode($a['json-options'])))));

  return <<<HTML
    <div class="qrgenerator" data-url="{$url}" data-size="{$size}" data-json-options="{$jsonOptions}" />
HTML;

}
add_shortcode(QSR_SHORTCODE_NAME_GENERATOR, 'qg_init_cc');

add_action('admin_enqueue_scripts', function(){
  wp_enqueue_script('qr-generator-script',  plugins_url( '../assets/qr-generator.js', __FILE__ ));
});




?>
