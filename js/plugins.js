
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());

// place any jQuery/helper plugins in here, instead of separate, slower script files.

/* A very thin shim for a few jQuery functions to allow the scripts in
   this file to work */
if(typeof(window.jQuery)=="undefined"){
  window.jQuery = function(selector){
    var rv, items=[];
    if(typeof(document.querySelectorAll)=="function" && typeof(selector)=="string"){
      items = document.querySelectorAll(selector);
    }
    else {
      items=[selector];
    }
    rv = {
    addClass: function(clz){
      var i;
      for(i=0; i<items.length; ++i){
        if(items[i].classList){
            items[i].classList.add(clz);
        }
        else{
            items[i].className += ' '+clz;
        }
      }
      return rv;
    },
    removeClass: function(clz){
      var i;
      for(i=0; i<items.length; ++i){
        if(items[i].classList){
            items[i].classList.remove(clz);
        }
        else{
            items[i].className = items[i].className.replace(new RegExp('('+clz+' )|( '+clz+')'),'');
        }
      }
      return rv;
    },
    on : function(ev,fn) {
      var i;
      for(i=0; i<items.length; ++i){
        items[i].addEventListener(ev,fn);
      }
    },
    off : function(ev,fn) {
      var i;
      for(i=0; i<items.length; ++i){
        items[i].removeEventListener(ev,fn);
      }
    },
    click: function(fn){
    	rv.on('click',fn);
    },
    width: function() {
      var i, elm, rv=0;
      for(i=0; i<items.length; ++i){
        elm = items[i];
        if(elm==window){
          elm = document.getElementsByTagName("html")[0];
        }
        rv += Math.max(elm.clientWidth, elm.offsetWidth);
      }
      return rv;
    },
    ready: function(fn) {
      document.addEventListener("DOMContentLoaded",fn);
    },
    deviceHooks: function() {
      if(typeof(jQuery.fn.deviceHooks)=="function"){
        jQuery.fn.deviceHooks();
      }    	
    }
    };
    return rv;
  };
  window.jQuery.fn={facade:true};
}

/*
 * OneWeb v3.0
 * Author: Seth Warburton
 * Copyright: Seth Warburton - (C) 2013 - All rights reserved
 * Licenses: GNU/GPL v3 or later http://www.gnu.org/licenses/gpl-3.0.html
 *           DBAD License http://philsturgeon.co.uk/code/dbad-license
 * Date: 30 April 2013
 */


(function( $ ) {
  'use strict';
  var sizeClasses=[ "dumb","lap","palm","portable","desk","desk-wide" ];
  $.fn.deviceHooks = function() {

      function updateClass(clz){
    var i;
    var htmlElem;
    if(typeof(document.getElementsByTagName)=="function"){
        htmlElem = document.getElementsByTagName("html")[0];
        for(i=0; i<sizeClasses.length; ++i){
            if(clz==sizeClasses[i]){
                htmlElem.classList.add(sizeClasses[i]);
            }
            else {
                htmlElem.classList.remove(sizeClasses[i]);
            }
        }
    }
    else{
      htmlElem = $("html");
      for(i=0; i<sizeClasses.length; ++i){
        if(clz==sizeClasses[i]){
            htmlElem.addClass(sizeClasses[i]);
        }
        else {
            htmlElem.removeClass(sizeClasses[i]);
        }
      }
    }
      }
      var resizer = function() {
          var width = $(window).width();
          var bodyFontSize = Number(getComputedStyle(document.body,null).fontSize.replace(/[^\d]/g, ''));
          /* break points are defined in _defaults.scss using em units */
          var palm=20 * bodyFontSize;
          var lap=45 * bodyFontSize;
          var portable=62 * bodyFontSize;
          var desk=90 * bodyFontSize;
          var deskwide=1900; /* 118 * bodyFontSize */;

          if (width >= deskwide) {
            updateClass("desk-wide");
          }
          else if (width >= desk) {
            updateClass("desk");
          }
          else if (width >= portable) {
            updateClass("portable");
          }
          else if (width >= lap) {
            updateClass("lap");
          }
          else if (width >= palm) {
            updateClass("palm");
          }
          else {
            updateClass("");
          }
      };

      // Call once to set.
      resizer();

      // Function for testing touch screens
     function is_touch_device() {
         return !! ('ontouchstart' in window);
      }

      // Set class on html element for touch/no-touch
      if (is_touch_device()) {
         $('html').addClass('touch');
      } else {
          $('html').addClass('no-touch');
      }

      // Call on resize.
      $(window).on('resize', resizer);

  };

})(jQuery);
