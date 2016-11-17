mf.mobileBreakpoint = 780;

mf.browser = {};
mf.browser.isIpad = ( navigator.userAgent.indexOf("iPad") != -1 ) ? true : false;

// if it's a tablet screen resolution or greater
if( window.screen.width >= mf.mobileBreakpoint || mf.browser.isIpad )
{
	$LAB.script( mf.jsLocation + 'jquery-1.9.1.min.js' ).wait().script( mf.jsLocation + 'isotope.min.js' ).wait().script( mf.jsLocation + 'mobile.js' ).wait().script( mf.jsLocation + 'non-mobile.js' ).script( mf.jsLocation + 'jquery.fitvids.js' );
}
// else if it's smartphone screen resolution
else
{
	$LAB.script( mf.jsLocation + 'jquery-1.9.1.min.js' ).wait().script( mf.jsLocation + 'mobile.js' ).script( mf.jsLocation + 'jquery.fitvids.js' );
}