(function ($, window, undefined) {
	"use strict";

	var defaultOptions = {
		media: false
	};

	var ToggleTabs = function (el, options) {
		var self =  this,
			opt = $.extend(defaultOptions, options);
			
		self.$target = $(el),
		self.$toggle = $(self.$target.attr('href')),
			

		self.init = function() {
			self.$target.on('click.toggleTabs', self.toggle);
			
			if (ToggleTabs.watcherInited === undefined) {
				self.initWatcher();
			}
		};

		self.toggle = function(e) {
			e.stopPropagation();
			e.preventDefault();
			
			if (self.isActive) {
				self.removeActive();
			} else {
				self.removeActive();
				self.setActive();
			}	
		};

		self.setActive = function() {
			self.isActive = true;
			self.$target.addClass('target-active');
			self.$toggle.addClass('toggle-active');

			ToggleTabs.active = self;
		};

		self.removeActive = function() {
			if (typeof ToggleTabs.active !== 'object') return;

			ToggleTabs.active.$target.removeClass('target-active');
			ToggleTabs.active.$toggle.removeClass('toggle-active');
			ToggleTabs.active.isActive = false;
		};

		self.initWatcher = function() {
			
			ToggleTabs.watcherInited = true;

			$(document).on('click.bodyToggleTabs', function(e) {
				var $target = $(e.target);
				if( !$target.hasClass('toggle-active') && !$target.closest('.toggle-active').length) {
					self.removeActive();
				}
			});
		};

		return self;
	};

	$.fn.toggleTabs = function(options) {
		var result = this;
		
		this.each(function (el, index) {
			var toggleTabs;

			if (!$(this).data('toggleTabs')) {
				toggleTabs = new ToggleTabs(this, options);
				toggleTabs.init();
				$(this).data('toggleTabs', toggleTabs);
			} else {
				toggleTabs = $(this).data('toggleTabs');
			}
			if ($.type(options) === 'string' && toggleTabs[options] !== undefined && $.isFunction(toggleTabs[options])) {
				result = toggleTabs[options]();
			}
		});

		return result;
	};
	
})(jQuery, window);