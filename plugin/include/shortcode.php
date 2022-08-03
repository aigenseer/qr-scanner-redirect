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


/**
 * [initialize the generator all by category shortcode]
 * @return String
 * Usage [QR-list category="QR" size="300"]
 * uses category slug to list post title, excerpt, qrcode
 */
function qg_all_init_cc($atts) {
  global $qsr_pluginsettings;
  $advanced = $qsr_pluginsettings->getAll('advanced', true);

  wp_enqueue_script('qr-generator-script',  plugins_url( '../assets/qr-generator.js', __FILE__ ));
  $a = shortcode_atts(['category' => null, 'size' => null, 'json-options' => '{}' ], $atts );
  if(is_null($a['category'])){
    return '<div class="notice notice-warning"><h3>No category in shortcode '.QSR_SHORTCODE_GENERATE_ALL.' found.</h3></div>';;
  }

  /** Get all posts with specified category
   */
   //get qrcode settings
     $buffer = "<table>";
     $size = $a['size'];
     $jsonOptions = esc_html(json_encode((array_merge((array) json_decode($advanced->qgjson), (array) json_decode($a['json-options'])))));
     //create query
    $q = new WP_Query(array(
        'post_type' => 'post',
        'posts_per_page' => 10,
        'category_name' => $a['category']
    ));
    
    //start loop if q returns post
    while ($q->have_posts()) {
        $q->the_post();
     
        $id = get_the_ID();
        $url = get_page_link($id);
        
         $QRcode=<<<HTML
 <div class="qrgenerator" data-url="{$url}" data-size="{$size}" data-json-options="{$jsonOptions}" />
HTML;
        
        //add content to buffer
        $buffer = $buffer."<tr><td>". get_the_title(). "</td><td>".get_the_excerpt()."</td><td>". $url."</td><td>". $QRcode."</td></tr>";
    }
    $buffer = $buffer."</table>";
    wp_reset_postdata();
    return $buffer;
}
   

add_shortcode(QSR_SHORTCODE_GENERATE_ALL, 'qg_all_init_cc');

add_action('admin_enqueue_scripts', function(){
  wp_enqueue_script('qr-generator-script',  plugins_url( '../assets/qr-generator.js', __FILE__ ));
});

?>
