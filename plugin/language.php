<?php
/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */
global $qsr_pluginsettings;
$qsr_pluginsettings->fetchPost('language');
$formvalues = $qsr_pluginsettings->getAll('language');

require 'httpsWarning.php';
require 'pluginsettingsform.php';
 ?>
