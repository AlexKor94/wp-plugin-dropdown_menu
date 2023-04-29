<?php

/**
 * Plugin Name:       Dropdown menu
 * Description:       Dropdown menu for my theme.
 * Version:           1.0.0
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Author:            AlexKor94
 * Text Domain:       sub-menu
 * Domain Path:       /languages
 */

if (!function_exists('add_action')) {
  echo 'Seems you visited this page accidantely ☺';
  exit;
}

//Setup
define('UP_PLUGIN_DIR', plugin_dir_path(__FILE__));
//Includes
include(UP_PLUGIN_DIR . 'includes/register-blocks.php');
//Hooks
add_action('init', 'ap_register_blocks');
