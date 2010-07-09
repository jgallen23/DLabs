(function($) {

    $.fn.onVisible = function(options) {
        var settings = {
            threshold    : 0,
            failurelimit : 0,
            container    : window,
			callback	 : false
        };

        if(options) {
            $.extend(settings, options);
        }

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        var elements = this;

		var checkScroll = function(event) {

			var counter = 0;
			elements.each(function() {
				if ($.abovethetop(this, settings) ||
					$.leftofbegin(this, settings)) {
						/* Nothing. */
				} else if (!$.belowthefold(this, settings) &&
					!$.rightoffold(this, settings)) {
						$(this).trigger("visible");
				} else {
					if (counter++ > settings.failurelimit) {
						return false;
					}
				}
			});
		};

		this.each(function() {
			if (settings.callback) {
				var t = $(this);
				t.one("visible", function() {
					settings.callback.call(t)
				});
			}
		});;

		$(settings.container).bind("scroll", checkScroll);

        /* Force initial check if images should appear. */
		$(settings.container).trigger("scroll");

		return this;

    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).height() + $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).width() + $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left + $(settings.container).width();
        }
        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top;
        }
        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left;
        }
        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };
    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() */

    $.extend($.expr[':'], {
        "below-the-fold" : "$.belowthefold(a, {threshold : 0, container: window})",
        "above-the-fold" : "!$.belowthefold(a, {threshold : 0, container: window})",
        "right-of-fold"  : "$.rightoffold(a, {threshold : 0, container: window})",
        "left-of-fold"   : "!$.rightoffold(a, {threshold : 0, container: window})"
    });

})(jQuery);

