/*
	dlabs
	
	UserAction.js
		Lazyloads any scripts or callbacks when the user performs an action. The default action is on first mouse move.
		
	Usage:
		Put script in header. This is a requirement if you wish to use the add method anywhere.
		
		UserAction.add( [string resource url] | [function callback]);
		UserAction.execute();
			
	Examples:
		UserAction.add("http://example.com/ui/scripts/plugins/facebookLike.js");
		UserAction.add("http://example.com/ui/scripts/plugins/facebookLike.js", function(){
			// Script has completed loading
			alert('Script loaded!');
		});
		UserAction.add(function(){
			alert("Hello world");
		});
		UserAction.execute();
*/

var UserAction = {
	scripts: [],
	scriptCallbacks: [],
	init: false,
	add: function(script, callback) {
		this.scripts.push(script);
		if (typeof(callback) == 'function') {
			this.scriptCallbacks[script] = callback;
		}
	},
	execute: function() {
		var $this = this;
		$(function() {
			function _exec() {
				if (!$this.init) {
					$this.init = true;
					
					for(var i=0;i<$this.scripts.length;i++) {
						if (typeof $this.scripts[i] == "string") {					
							if (typeof($this.scriptCallbacks[ $this.scripts[i] ]) != 'function') {
								$.getScript($this.scripts[i]);
							} else {
								var callback = $this.scriptCallbacks[ $this.scripts[i] ];
								$.getScript($this.scripts[i], function() {
									callback.call();
								});
							}
						}
						else if(typeof $this.scripts[i] == "function") $this.scripts[i]();
					}
				}
			}
			$(window).one("mousemove touchstart keypress scroll", function() {
				_exec();
			});
			$('body').one("mousemove touchstart keypress scroll", function() {
				_exec();
			});			
		});
	}
};