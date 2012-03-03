jQuery(document).ready(function($) {

  // set up nav li click handlers
  var handle_nav_li_click = function() {
    var section = $(this).html();
    $('nav li').removeClass('selected');
    $(this).addClass('selected');
    $('#main > div').hide();
    $('#main > #' + section).show();
  };
  $('nav li').click(handle_nav_li_click);
  $('nav li:first').click();


  //// galleriffic stuff follows.

  // We only want these styles applied when javascript is enabled
  $('div.navigation').css({'width' : '300px', 'float' : 'left'});
  $('div.content').css('display', 'block');

  // Initially set opacity on thumbs and add
  // additional styling for hover effect on thumbs
  var onMouseOutOpacity = 0.67;
  $('#thumbs ul.thumbs li').opacityrollover({
    mouseOutOpacity:   onMouseOutOpacity,
    mouseOverOpacity:  1.0,
    fadeSpeed:         'fast',
    exemptionSelector: '.selected'
  });

  // Initialize Advanced Galleriffic Gallery
  var gallery = $('#thumbs').galleriffic({
    delay:                     2500,
    numThumbs:                 50,
    preloadAhead:              10,
    enableTopPager:            true,
    enableBottomPager:         false,
    maxPagesToShow:            7,
    imageContainerSel:         '#slideshow',
    controlsContainerSel:      '#controls',
    captionContainerSel:       '#caption',
    loadingContainerSel:       '#loading',
    renderSSControls:          false,
    renderNavControls:         false,
    playLinkText:              'Play Slideshow',
    pauseLinkText:             'Pause Slideshow',
    prevLinkText:              '&lsaquo; Previous Photo',
    nextLinkText:              'Next Photo &rsaquo;',
    nextPageLinkText:          'Next &rsaquo;',
    prevPageLinkText:          '&lsaquo; Prev',
    enableHistory:             false,
    autoStart:                 false,
    syncTransitions:           true,
    defaultTransitionDuration: 100,
    onSlideChange: undefined,
    onPageTransitionOut: undefined,
    onPageTransitionIn: undefined
  });
});






