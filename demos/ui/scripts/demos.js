(function($) {
	$(function() {
		var tabs = $("ul.Tabs li");
		tabs.bind("click", function() {
			tabs.removeClass("selected");
			$(this).addClass("selected");
			var index = tabs.index(this);
			$("div.TabContent > div").hide().eq(index).show();
		});
	});
})(jQuery);
