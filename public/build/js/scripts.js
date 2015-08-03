(function() {
  var dotNavClick, mainContent, toggle, tooltipTargetClick, tooltipTargetHover, tooltipTargetHoverOut;

  mainContent = {
    'Home': '.blurb',
    'Activity': '.activity',
    'Contact': '.contact'
  };

  toggle = function(element) {
    $('div.main').css('display', '');
    _.chain(mainContent).values().each(function(content) {
      return $('div.main').find(content).css('display', 'none');
    }).value();
    element.css('display', 'inline');
  };

  dotNavClick = function(event) {
    var dot, el, name;
    dot = $(event.target);
    name = dot.attr('name');
    switch (name) {
      case 'Home':
      case 'Activity':
        el = $('div.main').find(mainContent[name]);
        toggle(el);
        break;
      case 'Contact':
        el = $('div.main').css('display', 'none');
    }
  };

  $(function() {
    $('.tooltip-target').hover(tooltipTargetHover);
    $('.tooltip-target').mouseleave(tooltipTargetHoverOut);
    $(".tooltip-target").click(tooltipTargetClick);
    $('div.dot').click(dotNavClick);
  });

  tooltipTargetHover = function(event) {
    var currentLi, dot, selectedLi, ul;
    dot = $(event.target);
    selectedLi = dot.parent();
    ul = selectedLi.parent();
    currentLi = ul.find('.current');
    if (selectedLi.is(currentLi)) {
      return;
    }
    selectedLi.css('z-index', 1000);
    selectedLi.find('.tooltip').css({
      visibility: 'visible',
      opacity: 1
    });
    if (!currentLi) {
      return;
    }
    currentLi.find('.tooltip').css('opacity', 0.5);
  };

  tooltipTargetHoverOut = function(event) {
    var currentLi, dot, selectedLi, ul;
    dot = $(event.target);
    selectedLi = dot.parent();
    ul = selectedLi.parent();
    currentLi = ul.find('.current');
    selectedLi.css('z-index', 999);
    if (selectedLi.is(currentLi)) {
      return;
    }
    selectedLi.find('.tooltip').css({
      visibility: 'hidden',
      opacity: 0
    });
    ul.find('.current').find('.tooltip').css('opacity', 1);
  };

  tooltipTargetClick = function(event) {
    var currentLi, dot, selectedLi, ul;
    dot = $(event.target);
    selectedLi = dot.parent();
    ul = selectedLi.parent();
    currentLi = ul.find('.current');
    if (selectedLi.is(currentLi)) {
      return;
    }
    if (currentLi) {
      currentLi.removeClass('current');
      currentLi.find('.tooltip').css({
        visibility: 'hidden',
        opacity: 0
      });
    }
    selectedLi.addClass('current');
  };

}).call(this);
