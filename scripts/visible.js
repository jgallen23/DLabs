(function($) {
	var userAgent = navigator.userAgent.toLowerCase();
	var isMobileSafari = userAgent.search('mobile') > -1 && userAgent.search('safari') > -1;
	
    $.fn.onVisible = function(options) {
        var settings = {
            threshold    : 0,
            container    : window,
            callback	 : false
        };

        if(typeof(options) != 'function') {
            $.extend(settings, options);
        } else {
            /*
             * If you're relying on the default options, just pass in a function 
             * as the parameter, rather than passing an entire object.
             */ 
            settings.callback = options;
        }
        
        /* Fire one scroll event per scroll. Not one scroll event per image. */
        var elements = this;
        
		var checkScroll = function(event) {
	        if (settings.container === window) {
	        	var windowHeight = $(window).height();
	            var scrollTop = $(window).scrollTop();
	        } else {
	            var scrollTop = $(settings.container).scrollTop();
	            var windowHeight = $(settings.container).height();
	        }
	        
			var foldHeight = windowHeight + settings.threshold;
			var viewableArea = (scrollTop + foldHeight);       
	        
			elements.each(function() {
				if (settings.container === window) {
					// Mobile Safari calculates an element's top offset based on the viewport
					var elemOffsetTop = !isMobileSafari ? $(this).offset().top : ((scrollTop - $(this).offset().top) * -1);
				} else {
					var elemOffsetTop = $(this).offset().top;
				}
									
				if (elemOffsetTop <= viewableArea) {
					$(this).trigger("visible");
				}
			});
		};

		this.each(function() {
			if (settings.callback) {
				var t = $(this);
				t.one("visible", function() {
					settings.callback.call(t);
				});
			}
		});

		$(settings.container).bind("scroll", checkScroll);

        /* Force initial check if images should appear. */
		$(settings.container).trigger("scroll");

		return this;
    };
})(jQuery);