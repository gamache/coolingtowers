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
  //// end of galleriffic stuff

  // bandcamp API consumption - render each track listed in Cooling Towers'
  // discography
  $.ajax({
    url: 'http://api.bandcamp.com/api/band/3/discography?key=ullrettkalladrhampa&band_id=2423741189',
    dataType: 'jsonp',
    success: function (data) {
      for (var i in data['discography']) {
        $.ajax({
          url: 'http://api.bandcamp.com/api/track/3/info?key=ullrettkalladrhampa&track_id='+data['discography'][i].track_id,
          dataType: 'jsonp',
          success: function (track) {
            $('#audio').append(
              $('<div class="track"></div>').html(
                '<img src="' + track['small_art_url'] + '">' +
                '<h2>' + track['title'] + '</h2>' +
                '<p class="credits">' + track['credits'] + '</p>' +
                '<p><a target="_blank" href="' + track['streaming_url'] +
                  '">Open in new window</a> or <a target="_blank" ' +
                  'href="http://coolingtowers.bandcamp.com' + track['url'] +
                  '">Listen on Bandcamp</a></p>'
              )
            );
          }
        });
      }
    }
  });

});






