# DOM is ready
$ ->
  $('.tooltip-target').hover tooltipTargetHover
  $('.tooltip-target').mouseleave tooltipTargetHoverOut
  $(".tooltip-target").click tooltipTargetClick

  return