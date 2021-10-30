<?php
/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */

/**
 * [print div tag with qrgenerator for display the qr code with the js lib qr-generator.js]
 * @param  stdobject $post
 */
function qsr_qr_code_generator($post)
{

    echo do_shortcode('[qr-generator id="'.$post->ID.'" size="200"  ]');
}

/**
 * [add the meta box]
 */
function qsr_add_meta_boxes()
{
    $screens = ['post', 'wporg_cpt', 'page'];
    foreach ($screens as $screen) {
        add_meta_box(
            QSR_SHORTCODE_NAME_METABOX,
            'Redirect QR-Code',
            'qsr_qr_code_generator',
            $screen,
            'side'
        );
    }
}

add_action( 'admin_enqueue_scripts', function()
{
    wp_enqueue_script('qr-generator-script',  plugins_url( '../assets/qr-generator.js', __FILE__ ));
});

add_action('add_meta_boxes', 'qsr_add_meta_boxes');
?>
