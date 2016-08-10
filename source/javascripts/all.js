//= require jquery
(function() {
  $(function() {
    var tooltipTargetClick, tooltipTargetHover, tooltipTargetHoverOut;

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
      if (dot.attr('href')) {
        selectedLi.removeClass('current');
        return;
      }
    };

    $('.tooltip-target').hover(tooltipTargetHover);
    $('.tooltip-target').mouseleave(tooltipTargetHoverOut);
    $('.tooltip-target').click(tooltipTargetClick);
  });

}).call(this);
