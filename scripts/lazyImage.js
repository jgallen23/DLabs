(function($) {
	$.fn.lazyImage = function(options) {
		 var settings = {
            errorImg: false,
			callback: false
        };
        if(options) {
            $.extend(settings, options);
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
