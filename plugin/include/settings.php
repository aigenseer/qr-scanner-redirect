<?php
/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */
global $qsr_pluginsettings;
$qsr_pluginsettings->fetchPost($active_tab);
$formvalues = $qsr_pluginsettings->getAll($active_tab);

require 'httpsWarning.php';
require 'pluginsettingsform.php';
 ?>
