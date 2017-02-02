/* --- Social likes --- */
(function($){
	var $head = $('head');
	window.__language = {
		lang: $head.data("language"),
		locale: $head.data("locale")
	};

	// init VK
	VK.init({
		apiId: 5818387,
		onlyWidgets: true
	});
	VK.Widgets.Like('vk_like', {type: "button", height: 22});

	// for GOOGLE+
	window.___gcfg = {
		lang: window.__language.lang,
		parsetags: 'onload'
	};

	// init FACEBOOK
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		if (window.__language.locale === "ar_AE") {
			// change locale for correct translation, facebook don't support ar_AE location
			js.src = "//connect.facebook.net/ar_AR/sdk.js#xfbml=1&version=v2.8";
		} else {
			js.src = "//connect.facebook.net/" + window.__language.locale + "/sdk.js#xfbml=1&version=v2.8";
		}
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	// init TWITTER
	!function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if(!d.getElementById(id)) {
			js = d.createElement(s);
			js.id = id;
			js.src = "https://platform.twitter.com/widgets.js";
			fjs.parentNode.insertBefore(js,fjs);
		}
	}(document, "script", "twitter-wjs");
})(jQuery);