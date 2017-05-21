//= require jquery
$(() => {
  const tooltipTargetHover = (event) => {
    const dot = $(event.target);
    const selectedLi = dot.parent();
    const ul = selectedLi.parent();
    const currentLi = ul.find('.current');
    if (selectedLi.is(currentLi)) {
      return;
    }
    selectedLi.css('z-index', 1000);
    selectedLi.find('.tooltip').css({
      visibility: 'visible',
      opacity: 1,
    });
    if (!currentLi) {
      return;
    }
    currentLi.find('.tooltip').css('opacity', 0.5);
  };

  const tooltipTargetHoverOut = (event) => {
    const dot = $(event.target);
    const selectedLi = dot.parent();
    const ul = selectedLi.parent();
    const currentLi = ul.find('.current');
    selectedLi.css('z-index', 999);
    if (selectedLi.is(currentLi)) {
      return;
    }
    selectedLi.find('.tooltip').css({
      visibility: 'hidden',
      opacity: 0,
    });
    ul.find('.current').find('.tooltip').css('opacity', 1);
  };

  const tooltipTargetClick = (event) => {
    const dot = $(event.target);
    const selectedLi = dot.parent();
    const ul = selectedLi.parent();
    const currentLi = ul.find('.current');
    if (selectedLi.is(currentLi)) {
      return;
    }
    if (currentLi) {
      currentLi.removeClass('current');
      currentLi.find('.tooltip').css({
        visibility: 'hidden',
        opacity: 0,
      });
    }
    selectedLi.addClass('current');
    if (dot.attr('href')) {
      selectedLi.removeClass('current');
    }
  };

  $('.tooltip-target').hover(tooltipTargetHover);
  $('.tooltip-target').mouseleave(tooltipTargetHoverOut);
  $('.tooltip-target').click(tooltipTargetClick);
});
