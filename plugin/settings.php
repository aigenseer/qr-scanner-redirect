<?php
/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */
global $qsr_pluginsettings;
$qsr_pluginsettings->fetchPost('settings');
$formvalues = $qsr_pluginsettings->getAll('settings');

require 'httpsWarning.php';
require 'pluginsettingsform.php';
 ?>
