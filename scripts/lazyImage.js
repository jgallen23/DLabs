(function($) {
	$.fn.lazyImage = function(options) {
		 var settings = {
            errorImg: false,
			callback: false
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
		return this.each(function() {
			var self = this;
			$("<img />")
				.bind("load", function() {
					$(self)
						.hide()
						.attr("src", $(self).attr("longdesc"))
						.fadeIn();
					if (settings.callback) settings.callback.call(self);
				}).bind("error", function() {
					if (settings.errorImg) {
						$(self).attr("src", settings.errorImg);
					}
				})
				.attr("src", $(self).attr("longdesc"));
		});
	};
})(jQuery);