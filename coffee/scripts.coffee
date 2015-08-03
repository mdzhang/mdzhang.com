mainContent =
  'Home': '.blurb'
  'Activity': '.activity'
  'Projects': '.projects'
  'Contact': '.contact'

# show element and hide siblings
toggle = (element) ->
  $('div.main').css('display', '')

  _.chain(mainContent).values().each((content) ->
    $('div.main').find(content).css('display', 'none')
  ).value()

  element.css('display', 'inline')

  return

dotNavClick = (event) ->
  dot = $(event.target)
  name = dot.attr('name')

  switch name
    when 'Home', 'Activity', 'Projects'
      el = $('div.main').find(mainContent[name])
      toggle(el)
    when 'Contact'
      el = $('div.main').css('display', 'none')

  return

# DOM is ready
$ ->
  $('.tooltip-target').hover tooltipTargetHover
  $('.tooltip-target').mouseleave tooltipTargetHoverOut
  $(".tooltip-target").click tooltipTargetClick

  $('div.dot').click dotNavClick

  return