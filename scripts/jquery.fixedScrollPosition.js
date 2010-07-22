/**
 * jquery.fixedPositionScroll.js
 * Copyright (c) 2010 Demand Media (http://www.demandmedia.com/)
 *
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 * 
 * @author Jeremy Rylan (http://jeremyrylan.com/)
 *
 * @projectDescription	jQuery plugin for allowing an element to switch to fixed position once the viewer 
 *			has scrolled beyond the element's original offset from the top of the document.
 * 
 * @version 1.0
 * 
 * @requires jquery.js (tested with 1.4.2)
 * 
 * @param topOffset	string	The top offset the element should position itself to once the viewer 
 *				has scrolled beyond the original position of the element.
 *				Can be provided in any standard CSS unit (10px, 5em, 5ex, 2in).
 *				default: 0
 *
 * Example
 * $('#elem').fixedScrollPosition('10px');
 *
 * // If you need to unbind the fixed position behavior, just cache the initialization as a variable 
 * // and use the stop trigger.
 * var foo =  $('#elem').fixedScrollPosition('10px');
 * foo.trigger('stop');
 *
 * // And if you need to start it again:
 * foo.trigger('start');
 */
(function($) {
	var userAgent = navigator.userAgent.toLowerCase();
	var isMobileSafari = userAgent.search('mobile') > -1 && userAgent.search('safari') > -1;

	$.fixedScrollPosition = function (elem, topOffset) {
		var eventId = ('fsp__'+Math.random()).replace(/\./,'');
		
		elem = $(elem); // Convert elem into a jQuery object

		elem.bind("start", function() {
			var elemOrigPos = elem.css('position'); // Element original position (static, relative, absolute, etc)
			var elemOrigTop = elem.css('top'); // Element original relative top offset
			var elemOrigOffset = parseInt(elem.offset().top); // Element original document top offset
					
			function position() {
				// If the viewer has scrolled beyond the top offset of the element container, set the element to fixed position
				if (elemOrigOffset < $(window).scrollTop()) {
					elem.css('position', 'fixed');
					elem.css('top', topOffset);
				} else {
					// Otherwise set the element back to it's original position and relative top offset.
					elem.css('position', elemOrigPos);
					elem.css('top', elemOrigTop);
				}
			}
			
			$(window).bind('scroll.' + eventId + ' load.' + eventId, function () {
				position();
			});
	
			$(document).ready(function() {
				position();
			});
		});
		
		elem.trigger('start');

		elem.bind("stop", function() {
			$(window).unbind('scroll.' + eventId + ' load.' + eventId);
		});
	};
	
	$.fn.fixedScrollPosition = function (topOffset) {
		if (!isMobileSafari) { // Mobile Safari doesn't support fixed position, don't even bother.
			this.each(function() {
				new $.fixedScrollPosition(this, (typeof(topOffset) !== 'undefined' ? topOffset : 0));
			});
		}
		
		return this;
	};
})(jQuery);