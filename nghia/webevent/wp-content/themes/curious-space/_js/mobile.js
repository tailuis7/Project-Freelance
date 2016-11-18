$(document).ready(function() {

// ************************************* GENERAL SET UP *************************************

	mf.windowObject = $(window);
	mf.bodyObject = $('body');
	mf.htmlObject = $('html');

	mf.mainElem = $('#main');

	mf.usingTouchEvents = false;

	mf.jqueryActiveClass = 'jquery_active';

	// we need to add juery active class to ensure correct styling on mobile
	mf.htmlObject.addClass( mf.jqueryActiveClass );

	// disable ajax caching in the browser
	$.ajaxSetup ({
		cache: false
	});

	$(".project_oembed").fitVids();

// ************************************* MENUS & NAVIGATION *************************************

	mf.mobileNavMenu = {};

	mf.mobileNavMenu.showHide = function()
	{
		if( mf.mobileNavMenu.bannerNavElem.hasClass( 'active' ) )
		{
			mf.mobileNavMenu.bannerNavElem.removeClass( 'active' );
		}
		else
		{
			mf.mobileNavMenu.bannerNavElem.addClass( 'active' );
		}
	}

	mf.mobileNavMenu.clickSHowHideBtn = function()
	{
		if( !touchEventsInUse() )
		{
			mf.mobileNavMenu.showHide();
		}
	}

	mf.mobileNavMenu.touchSHowHideBtn = function()
	{
		mf.usingTouchEvents = true;

		mf.mobileNavMenu.showHide();
	}

	// checks to see if the user has previously interacted using touch. if so, returns true and cancels click event handlers
	function touchEventsInUse()
	{
		if( mf.usingTouchEvents == true )
		{
			mf.mobileNavMenu.showHideButton.off( 'click');

			return true;
		}
		else
		{
			return false
		}
	}

	mf.mobileNavMenu.init = function()
	{
		mf.mobileNavMenu.bannerNavElem = $('#banner_nav');
		mf.mobileNavMenu.showHideButton = $('#show_menu_text');

		mf.mobileNavMenu.showHideButton.on( 'click', mf.mobileNavMenu.clickSHowHideBtn );

		// event handler for touchstart event
		if ( 'ontouchstart' in document )
		{
			// slideshow swiping
			document.getElementById('show_menu_text').addEventListener("touchend", mf.mobileNavMenu.touchSHowHideBtn, false);
		}
	}

	if( $('#banner_nav').length > 0 )
	{
		mf.mobileNavMenu.init();
	}

	if($('#location_map').length) {
		embedMap();
	}

});

// Google Maps
function embedMap() {
	// Setup map and map options
	var latlng = new google.maps.LatLng(50.828665, -0.134083);
	var mapOptions = {
		backgroundColor: 'black',
		zoom: 16,
		center: latlng,
		disableDefaultUI: false,
		panControl: false,
		zoomControl: true,
		streetViewControl: true,
		mapTypeControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("location_map"),mapOptions);
	google.maps.event.addListenerOnce(map, 'tilesloaded', function(){

		var marker = new google.maps.Marker({
			map: map,
			draggable: false,
			animation: google.maps.Animation.DROP,
			position: latlng
		});
		google.maps.event.addListener(map, 'click', getMap);
		google.maps.event.addListener(marker, 'click', getMap);

	});
}
// Map clicks
function getMap() {
	var load = window.open('https://www.google.com/maps/place/Phoenix+Brighton/@50.8286533,-0.1340685,21z/data=!4m7!1m4!3m3!1s0x4875859e8d33b8b9:0xb96366afbeb47d6f!2sPhoenix+Brighton!3b1!3m1!1s0x4875859e8d33b8b9:0xb96366afbeb47d6f?hl=en_uk','','');
}