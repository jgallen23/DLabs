/*
	dlabs
	
	UserAction.js
		Lazyloads any scripts or callbacks when the user performs an action. The default action is on first mouse move.
		
	Usage:
		Put script in header. This is a requirement if you wish to use the add method anywhere.
		
		UserAction.add( [string resource url] | [function callback]);
		UserAction.execute();
			
	Examples:
		UserAction.add("http://example.com/ui/scripts/plugins/facebookLike,js");
		UserAction.add(function(){
			alert("Hello world");
		});
		UserAction.execute();
*/

var UserAction = {
	scripts: [],
	add: function(script) {
		this.scripts.push(script);
	},
	execute: function() {
		var $this = this;
		$(function() {
			$('body').one("mousemove", function() {
				for(var i=0;i<$this.scripts.length;i++) {
					if(typeof $this.scripts[i] == "string") $.getScript($this.scripts[i]);
					else if(typeof $this.scripts[i] == "function") $this.scripts[i]();
				}
			});
		});
	}
};