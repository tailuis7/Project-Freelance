$(document).ready(function() {

// ************************************* GENERAL SET UP *************************************

	// does the browser support media queries & what's the current break point
	mf.mediaQueries = {};

	mf.mediaQueries.supported = Modernizr.mq('(min-width: 1px)') ? true : false;
	mf.mediaQueries.highResBreakPoint = 1020;
	mf.mediaQueries.lowResBreakPoint = 780;
	mf.mediaQueries.currentBreakPoint = 'low';
	mf.mediaQueries.previousBreakPoint = 'low';

	mf.mediaQueries.determineBreakPoint = function()
	{
		if( mf.mediaQueries.supported )
		{
			mf.mediaQueries.previousBreakPoint = mf.mediaQueries.currentBreakPoint;

			if( mf.windowObject.width() >= mf.mediaQueries.highResBreakPoint )
			{
				mf.mediaQueries.currentBreakPoint = 'high';
			}
			else if( mf.windowObject.width() < mf.mediaQueries.lowResBreakPoint )
			{
				mf.mediaQueries.currentBreakPoint = 'mobile';
			}
			else
			{
				mf.mediaQueries.currentBreakPoint = 'low';
			}
		}
	}

	mf.mediaQueries.determineBreakPoint();

	// is the browser one of the ones on the problem list?
	mf.browser.isIE7 = false;
	mf.browser.isSafari5 = false;
	mf.browser.isSafari4 = false;
	mf.browser.isOpera = true;

	if( mf.browser.isIpad )
	{
		mf.htmlObject.addClass('no_fixed_layout');
	}

	if( navigator.userAgent.indexOf("MSIE 7") != -1 )
	{
		mf.isIE7 = true;
		mf.htmlObject.addClass('no_fixed_layout');
	}
	else if( navigator.userAgent.indexOf("Safari") != -1 &&  navigator.userAgent.indexOf("Version/5") != -1 )
	{
		mf.isSafari5 = true;

		mf.htmlObject.removeClass('wide_filter_transition');
	}
	else if( navigator.userAgent.indexOf("Safari") != -1 &&  navigator.userAgent.indexOf("Version/4") != -1 )
	{
		mf.isSafari4 = true;

		mf.htmlObject.addClass('no_fixed_layout');
		mf.htmlObject.removeClass('wide_filter_transition');
	}
	else if( navigator.userAgent.indexOf("Opera") != -1 )
	{
		mf.browser.isOpera = true;
	}

// ************************************* WINDOW RESIZING *************************************

	mf.windowResizeTimer = {};

	mf.resizeWindow = function()
	{
		// code to execute every time the window is resized
	}

	// called every time the window is resized
	mf.windowObject.on( 'resize', function()
	{
		clearTimeout( mf.windowResizeTimer );
		mf.windowResizeTimer = setTimeout( mf.resizeWindow, 200 );

		mf.mediaQueries.determineBreakPoint();
		mf.dynLogo.setLetterHeights();
		mf.projectFiltering.toggleIsotope();
	});

// ************************************* DYNAMIC LOGO *************************************

	mf.dynLogo = {};

	mf.dynLogo.setLetterHeights = function()
	{
		// don't do anything if it's at the mobile break point, as the mobile stylesheet hides the dynamic logo
		if( mf.mediaQueries.currentBreakPoint == 'mobile' )
		{
			return;
		}

		// gets the current scroll top value, determines the correct height for each letter
		// and sets the height of each letter
		// – in a nutshell, this will cause the logo letters to contract as you scroll down
		// and expand as you scroll up

		// are we at the high res or low res breakpoint?
		// and so should we use the high res or low res logo height & offset values?
		if( mf.mediaQueries.currentBreakPoint == 'low' )
		{
			var letterYOffsets = mf.dynLogo.letterYOffsetsA;
			var heightLimit = mf.dynLogo.heightLimitA;
		}
		else
		{
			var letterYOffsets = mf.dynLogo.letterYOffsetsB;
			var heightLimit = mf.dynLogo.heightLimitB;
		}

		// How far are we in pixels from the top of the window?
		var currentScrollTop = mf.windowObject.scrollTop();

		// how far have we progressed (0 = 0%, 1 = 100%, > 1 = 100%) through the transition?
		var logoTransitionProgress = currentScrollTop / heightLimit;
		logoTransitionProgress = logoTransitionProgress > 1 ? 1 : logoTransitionProgress;

		for( i = 0; i < mf.dynLogo.letterElems.length; i++ )
		{
			var letterElem = mf.dynLogo.letterElems.eq(i);

			var newYOffset = letterYOffsets[i] + (0 - (letterYOffsets[i] * logoTransitionProgress));

			// Ensure Y offset is never less than zero
			newYOffset = newYOffset < 0 ? 0 : newYOffset;

			// set the new offset for the letter
			if( Modernizr.csstransforms3d )
			{
				letterElem.css( '-webkit-transform', 'translate3D(0px, ' + newYOffset + 'px, 0px)' ).css( '-moz-transform', 'translate3D(0px, ' + newYOffset + 'px, 0px)' ).css( '-o-transform', 'translate3D(0px, ' + newYOffset + 'px, 0px)' ).css( 'transform', 'translate3D(0px, ' + newYOffset + 'px, 0px)' );
			}
			else
			{
				letterElem.css( 'top', newYOffset + 'px' );
			}

		}

		// set the opacity of the banner backing panel
		var newOpacity = logoTransitionProgress > mf.dynLogo.bannerBackingMaxOpacity ? mf.dynLogo.bannerBackingMaxOpacity : logoTransitionProgress;
		mf.dynLogo.bannerBackingElem.css('opacity', newOpacity).css('filter', 'alpha(opacity = ' + (newOpacity * 100) + ')');
	}

	mf.dynLogo.init = function()
	{
		mf.dynLogo.letterElems = $('.dynamic_logo_letter');
		mf.dynLogo.bannerBackingElem = $('#banner_backing');
		mf.dynLogo.bannerBackingMaxOpacity = 0.9;

		// lower break point
		mf.dynLogo.heightLimitA = 120; // how many pixels will the transition take to complete from the top

		mf.dynLogo.letterYOffsetsA = new Array(
			0,
			30,
			0,
			30,
			60,
			60,
			90,
			90,
			60,
			120,
			90,
			120
		);

		// higher break point
		mf.dynLogo.heightLimitB = 160; // how many pixels will the transition take to complete from the top

		mf.dynLogo.letterYOffsetsB = new Array(
			0,
			40,
			0,
			40,
			80,
			80,
			120,
			120,
			80,
			160,
			120,
			160
		);

		// set heights on scroll
		mf.windowObject.on( 'scroll', mf.dynLogo.setLetterHeights );
	}

	mf.dynLogo.init();
	mf.dynLogo.setLetterHeights();


// ************************************* PROJECT FILTERING *************************************

	mf.projectFiltering = {};

	mf.projectFiltering.ProjectIndexElem = $('#project_index_list');
	mf.projectFiltering.currentFilter = '.all';
	mf.projectFiltering.filterProjectsElem = $('#filter_projects');

	mf.projectFiltering.filter = function( e, filterBy )
	{
		if(e)
		{
			e.preventDefault();
		}

		if( filterBy == mf.projectFiltering.currentFilter )
		{
			return;
		}

		// isotope filtering
		isotopeFilter = filterBy == '.all' ? '' : filterBy;
		mf.projectFiltering.ProjectIndexElem.isotope({ filter: isotopeFilter });

		// update the filter options to highlight current filter option
		$('#filter_projects_options li').filter( mf.projectFiltering.currentFilter ).removeClass('selected');
		$('#filter_projects_options li').filter( filterBy ).addClass('selected');

		mf.projectFiltering.currentFilter = filterBy;

		mf.projectFiltering.filterProjectsElem.removeClass('active');
		$('#project_index_list').removeClass('shifted_left');
	}

	mf.projectFiltering.showHide = function()
	{
		if( mf.projectFiltering.filterProjectsElem.hasClass('active') )
		{
			mf.projectFiltering.filterProjectsElem.removeClass('active');
			$('#project_index_list').removeClass('shifted_left');
		}
		else
		{
			mf.projectFiltering.filterProjectsElem.addClass('active');
			$('#project_index_list').addClass('shifted_left');
		}
	}

	mf.projectFiltering.activateIsotope = function()
	{
		// don't activate if it's the mobile breakpoint
		if( mf.mediaQueries.currentBreakPoint == 'mobile' )
		{
			return;
		}

		// activate isotope plugin
		mf.projectFiltering.ProjectIndexElem.isotope(
		{
		  // options
		  itemSelector : '.project_image',
		  layoutMode : 'fitRows'
		});
	}

	mf.projectFiltering.deactivateIsotope = function()
	{
		mf.projectFiltering.ProjectIndexElem.isotope('destroy');
	}

	mf.projectFiltering.toggleIsotope = function()
	{
		// when we switch between mobile and desktop layouts / media queries, disable and enable isotope as appropriate

		// if there was no change in breakpoint, don't do anything
		if( mf.mediaQueries.previousBreakPoint == mf.mediaQueries.currentBreakPoint )
		{
			return;
		}

		// if we just entered mobile layout, deactivate isotope
		if( mf.mediaQueries.currentBreakPoint == 'mobile' )
		{
			mf.projectFiltering.deactivateIsotope();
		}
		// else if we just entered the desktop layout, activate isotope
		else if( mf.mediaQueries.previousBreakPoint == 'mobile' )
		{
			mf.projectFiltering.activateIsotope();
		}
	}

	mf.projectFiltering.clickShowHideBtn = function()
	{
		if( !touchEventsInUse() )
		{
			mf.projectFiltering.showHide();
		}
	}

	mf.projectFiltering.touchShowHideBtn = function()
	{
		mf.usingTouchEvents = true;

		mf.projectFiltering.showHide();
	}

	// checks to see if the user has previously interacted using touch. if so, returns true and cancels click event handlers
	function touchEventsInUse()
	{
		if( mf.usingTouchEvents == true )
		{
			mf.mobileNavMenu.showHideButton.off( 'click');
			$('#filter_projects h2').off( 'click' );

			return true;
		}
		else
		{
			return false
		}
	}

	mf.projectFiltering.init = function()
	{
		mf.projectFiltering.activateIsotope();

		// on clicking filter options, filter the projects
		$('#filter_projects_options li').on( 'click', function(e)
		{
			mf.projectFiltering.filter( e, $(this).data('filterBy') );
		});

		// on clicking filter options header, toggle to hide and reveal the options
		$('#filter_projects h2').on( 'click', function(e)
		{
			mf.projectFiltering.clickShowHideBtn();
		});

		// event handler for touchstart event
		if ( 'ontouchstart' in document )
		{
			document.getElementById('filter_projects_header').addEventListener("touchend", mf.projectFiltering.touchShowHideBtn, false);
		}

		// when the page loads in, check if there's a hash at the end – should we do any filtering straight away?
		if( window.location.hash.length > 1 )
		{
			mf.projectFiltering.filter( null, '.' + window.location.hash.substring(1) );
		}
	}

	if( $('#filter_projects_options').length > 0 )
	{
		mf.projectFiltering.init();
	}

// ************************************* FORMS *************************************

	// remove and replace input field default values
	// first let's find all the input fields on the page that have a default value
	mf.defaultInputValues = new Array();

	$('input[type=text], input[type=email]').each( function(i)
	{
		var inputElem = $(this);

		if( inputElem.attr('placeholder') )
		{
			mf.defaultInputValues[inputElem.attr('id')] = inputElem.attr('placeholder');

			// copy the placeholder attribute value to the value attribute (make sense?!)
			// and remove the placeholder value
			inputElem.val( mf.defaultInputValues[inputElem.attr('id')] );
			inputElem.prop('placeholder', '')

			// now assign the functions that will cause the default text to be hidden and shown
			inputElem.focus( function()
			{
				var inputElem = $(this);

				if( inputElem.prop('value') == mf.defaultInputValues[inputElem.attr('id')] )
				{
					inputElem.prop('value', '');
				}
			});

			inputElem.focusout( function()
			{
				var inputElem = $(this);

				if( inputElem.prop('value') == '' )
				{
					inputElem.prop('value', mf.defaultInputValues[inputElem.attr('id')]);
				}
			});
		}
	});
});