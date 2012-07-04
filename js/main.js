jQuery(document).ready(function($) {

  // Given a section name, this will highlight the nav li and show only
  // that section
  var show_section = function (section) {
    $('nav li').removeClass('selected');
    $('nav li.' + section).addClass('selected');
    $('#main > div').hide();
    $('#main > #' + section).show();
    document.title = 'Cooling Towers - ' + section.charAt(0).toUpperCase() +
                     section.slice(1);
  };

  // This specifies the section to show on the front page.
  var show_main_section = function () {
    show_section('news');
    return false;
  };


  // site navigation is implemented with popState and pushState
  var handle_popstate = function(e) {
    var section = e.state ? e.state['section'] : null;
    if (section) {
      // This is a popState event from hitting the Back button.  There will
      // have been a valid state object; show the section listed there.
      show_section(section);
    }
    else {
      // This is a popState event from loading the page.  If the URL has
      // an #id at the end of it, show that section; otherwise do nothing.
      var h = document.location.href;
      if (h.indexOf('#') != -1) {
        section = h.slice(h.indexOf('#')+1);
        show_section(section);
        window.scrollTo(0,0);
      }
    }
  };
  window.onpopstate = handle_popstate;

  // set up nav li click handlers to use pushState
  var handle_nav_li_click = function() {
    var section = this.innerHTML;
    history.pushState({section: section}, '', '#'+section);
    show_section(section);
  };
  $('nav li').click(handle_nav_li_click);
  show_main_section();


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
            $('#tracks').append(
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






