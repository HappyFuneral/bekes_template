<?php
/*
Plugin Name: Disable WP Sitemap
Description: Disable WordPress Native Sitemap Automatic Creation. Very Simple: Just Activate or Deactivate it. No Admin Panel available. 
Version: 1.6
Author: Bill Minozzi
Author URI: http://billminozzi.com
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

// Make sure the file is not directly accessible.
if (!defined('ABSPATH')) {
    die('We\'re sorry, but you can not directly access this file.');
}

define("DISABLE_SITEMAP_PATH", plugin_dir_path(__FILE__));

function disable_sitemap_main() {
    add_filter( 'wp_sitemaps_enabled', '__return_false' );
}
add_action( 'init', 'disable_sitemap_main' );

// 08 2023
 require_once ABSPATH . 'wp-includes/pluggable.php';
// check 4 errors...
if(is_admin() and current_user_can("manage_options")){
    if (!class_exists('Bill_Class_Diagnose') and !function_exists('bill_my_custom_hooking_function')) {
		function bill_my_custom_hooking_function() {
            $plugin_slug = "disable-wp-sitemap"; // Replace with your actual text domain
            $plugin_text_domain = "disable-wp-sitemap"; // Replace with your actual text domain
                $notification_url = "https://wpmemory.com/fix-low-memory-limit/";
			$notification_url2 =
				"https://wptoolsplugin.com/site-language-error-can-crash-your-site/";
            require_once(DISABLE_SITEMAP_PATH . "includes/checkup/bill_class_diagnose.php");
            }
		add_action('init', 'bill_my_custom_hooking_function');
    }
}


if (! class_exists('bill_catch_errors') and !function_exists('bill_my_custom_hooking_function2')) {
    function bill_my_custom_hooking_function2() {
        require_once(DISABLE_SITEMAP_PATH . "includes/checkup/class_bill_catch_errors.php");   
    }
    add_action('init', 'bill_my_custom_hooking_function2');
 }

  // run the ajax...
if (!function_exists('bill_get_js_errors')) {
    function bill_get_js_errors()
        {
            if (isset($_REQUEST)) {
                if (!isset($_REQUEST['bill_js_error_catched']))
                    die("empty error");
                if (!wp_verify_nonce($_POST['_wpnonce'], 'jquery-bill')) {
                    status_header(406, 'Invalid nonce');
                    die();
                }
                $bill_js_error_catched = sanitize_text_field($_REQUEST['bill_js_error_catched']);
                $bill_js_error_catched = trim($bill_js_error_catched);
                if (!empty($bill_js_error_catched)) {
                    $txt = 'Javascript ' . $bill_js_error_catched;
                    error_log($txt);
                    // send email
                    // bill_php_error($txt);
                    //set_transient( 'sbb_javascript_error', '1', (3600*24) );
                    //add_option( 'sbb_javascript_error', time() );
                    die('OK!!!');
                }
            }
            die('NOT OK!');
        }
}

?>
