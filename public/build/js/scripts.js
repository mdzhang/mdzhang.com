(function() {
  var dotClick, dotHover, dotHoverOut;

  dotHover = function(event) {
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
    return currentLi.find('.tooltip').css('opacity', 0.5);
  };

  dotHoverOut = function(event) {
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
    return ul.find('.current').find('.tooltip').css('opacity', 1);
  };

  dotClick = function(event) {
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
    return selectedLi.addClass('current');
  };

  $(function() {
    $('.dot').hover(dotHover);
    $('.dot').mouseleave(dotHoverOut);
    return $(".dot").click(dotClick);
  });

}).call(this);
