<?php

function isSecure() {
    return
      (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
      || $_SERVER['SERVER_PORT'] == 443;
}

if(!isSecure()) {
    print '<div class="notice notice-warning"><h3>Your url is not secure. The latest browser only supports the camera API with an SSL connection.</h3></div>';
}


?>

