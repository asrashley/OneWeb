/*
 * OneWeb v3.0
 * Author: Seth Warburton
 * Copyright: Seth Warburton - (C) 2013 - All rights reserved
 * Licenses: GNU/GPL v3 or later http://www.gnu.org/licenses/gpl-3.0.html
 *           DBAD License http://philsturgeon.co.uk/code/dbad-license
 * Date: 30 April 2013
 */

// Append some styling hooks related to device capabilities to html and body elements
// Got js?
if(typeof(document.getElementsByTagName)=="function"){
	document.getElementsByTagName("html")[0].classList.remove('no-js');
	document.getElementsByTagName("html")[0].classList.add('js-enabled');
}
else{
	jQuery("html").removeClass("no-js").addClass("js-enabled");
}
if(typeof(window.jQuery)!="undefined"){
jQuery(document).ready(function(){
	'use strict';
	if(typeof(document.getElementsByTagName)=="function"){
		document.getElementsByTagName("html")[0].classList.add('animate');
	}
	else{
		jQuery("html").addClass("animate");
	}
	// Touch? Screen type?
	jQuery().deviceHooks();

  // Checks if article images and videos have figure tags and adds them if not
  jQuery(function figtarget() {
     figtag(".article-content img");
  });

  function figtag(theElement) {
    jQuery(theElement).each(function(){
    if (!jQuery(this).parent().is("figure")) {
        jQuery(this).wrap("<figure>");
    }
    });
  }

// Scroll to top
    jQuery(function () {
    var scrollDiv = document.createElement("a");
    jQuery(scrollDiv).attr("class", "to-top").appendTo("body").attr("title", "Click here to soar gracefully upwards like an eagle!").text("^");
jQuery(".to-top").fadeOut();
    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() !== 0) {
          jQuery(".to-top").fadeIn();
        } else {
          jQuery(".to-top").fadeOut();
        }
      });
      jQuery(".to-top").click(function () {
        jQuery("body,html").animate({
          scrollTop: 0
        },
       800);
      });
    });

    jQuery('.mobileMenu').click(function(ev){
	ev.preventDefault();
	jQuery('header[role="banner"]').addClass('expand-menu');
	return false;
    });

 });
}
