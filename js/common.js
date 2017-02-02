jQuery(document).ready(function() {
	var $win = $(window);

	/* --- STICKY HEADER --- */
	$win.scroll(function () {
		var sc = $win.scrollTop()
		if (sc > 76) {
			$('.header').addClass('sticky');
		} else {
			$('.header').removeClass('sticky');
		}
	});

	/* --- SLIDER --- */
	$('.clients-list').slick({
		dots: true,
		infinite: false,
		speed: 300,
		slidesToShow: 6,
		slidesToScroll: 6,
		appendDots: '.clients-home .dots-container',
		nextArrow: '.clients-home .next-btn',
		prevArrow: '.clients-home .prev-btn',
		responsive: [
			{
				breakpoint: 1300,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 5
				}
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4
				}
			},
			{
				breakpoint: 968,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					dots: false
				}
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false
				}
			}
		]
	});

	/* --- TOGGLE ABOUT --- */
	$('.toggle-link').on('click', function(e){
		e.preventDefault();

		var $link = $(this),
			$parent = $link.closest('.toggle-unit'),
			$el = $parent.find('.toggle-el');

		if ($el.length) {
			var $down = $link.find('.arrow-down'),
				$up = $link.find('.arrow-up');
			
			if ($down.length && $up.length && !$down.is(':visible') && !$up.is(':visible')) {
				return false;
			}
			$el.slideToggle(
				{
					complete: function() {
						$parent.toggleClass('opened');
					}
				}
			);
		} else {
			$parent.toggleClass('opened');
		}
	});

	/* --- INIT SELECT --- */
	$('.simple-select').select2({
		minimumResultsForSearch: Infinity
	});

	/* --- TOGGLE SUBSCRIPTION FORM --- */
	$('.subscription .main-title').on('click', function(e){
		e.preventDefault();
		var $toggler = $(this);
		if (!$toggler.find('.icon-subscription').is(':visible')) {
			return false;
		} else {
			$('.subscription-form').slideToggle(
				{
					start: function() {
						$('.simple-select').select2({
							minimumResultsForSearch: Infinity
						});
					},
					complete: function() {
						$toggler.toggleClass('opened');
					}
				}
			);
		}
	});

	/* --- TOP MENU --- */
	var $catalog = $('#js-catalog'),
		$mobileMenuItems = $('.js-media-menu-item'),
		$menuItems = $('.desktop-menu .l-2 > li'),
		$headerMenu = $('#header-menu'),
		$headerMenuLink = $('.header-menu').find('a[href="#header-menu"]'),
		$mobileToggleItems = $headerMenu.find('.toggle-link, .toggle-arr'),
		menuDelay = null,
		menuState;

	buildHeaderMenu();

	function buildHeaderMenu () {
		var pageWidth = $.getDocumentWidth();

		if (pageWidth > 980) {
			if (menuState === 'desktop') {
				return;
			}

			$mobileToggleItems.off('click.menuItemClick');
			$mobileMenuItems.toggleTabs('removeActive');
			menuState = 'desktop';
			
			var $next = false;

			$menuItems.on('mouseenter.menuItemHover', function(e){
				e.preventDefault();

				var $el = $(e.currentTarget),
					$from = $(e.fromElement);
				
				$next = $el;

				var setActive = function() {
					if ($el.hasClass('active')) {
						return;
					}
					
					$menuItems.removeClass('active');
					$el.addClass('active');
				};

				if (menuDelay == null) {
					setActive();
				}
			}).on('mouseleave.menuItemHover', function(e){
				e.preventDefault();

				var $el = $(e.currentTarget);

				if (!$el.hasClass('active')) {
					return;
				}

				menuDelay = setTimeout(function() {
					$el.removeClass('active');
					$next.addClass('active');
					clearTimeout(menuDelay);
					menuDelay = null;
				}, 100);
			});

			$catalog.on('mouseenter.menuItemHover', function(e){
				$mobileMenuItems.toggleTabs('removeActive');
				e.preventDefault();
				$(e.currentTarget).addClass('active');

				if (!$menuItems.filter('.active').length) {
					$menuItems.eq(0).addClass('active');
				}
			}).on('mouseleave.menuItemHover', function(e){
				e.preventDefault();
				$(e.currentTarget).removeClass('active');
				$menuItems.removeClass('active');
			});
		} else {
			if (menuState === 'mobile') {
				return;
			}
			$menuItems.off('.menuItemHover');
			$catalog.off('.menuItemHover');
			menuState = 'mobile';

			$mobileMenuItems.toggleTabs();
			
			$mobileToggleItems.on('click.menuItemClick', function(e) {
				e.preventDefault();
				e.stopPropagation();

				$(e.currentTarget).closest('.parent').toggleClass('active');
			});
		}
	}

	$('.js-catalog-link').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();

		var $link = $(e.currentTarget),
			$section = $($link.attr('href'));

		if ($section.length) {
			if (!$section.hasClass('active')) {
				$menuItems.removeClass('active');
				$section.addClass('active');
			}

			$catalog.addClass('active');
		}

		if (menuState === 'mobile') {
			$headerMenuLink.click();
		}
	});

	var avail = window.screen.availWidth > window.screen.availHeight ? window.screen.availWidth : window.screen.availHeight;

	if (avail > 980) {
		$win.on('resize', function() {
			buildHeaderMenu();
		});
	}
});

jQuery.getDocumentWidth = function() {
	return jQuery('.width-checker').width();
}

jQuery.isTouchDevice = function () {
	return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
};

jQuery.isMobileIos = !!(navigator.platform && /iPhone|iPad/.test(navigator.platform));
