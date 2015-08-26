mainContent =
  'Home': '.blurb'
  'Activity': '.activity'
  'Projects': '.projects'
  'Contact': '.contact'

activity = Activity()

# show element and hide siblings
toggle = (element) ->
  $('div.main').css('display', '')

  _.chain(mainContent).values().each((content) ->
    $('div.main').find(content).css('display', 'none')
  ).value()

  # TODO: messy to have to handle vendor prefixes here
  element.css('display', 'flex')
  element.css('display', '-webkit-flex')

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

activityNavClick = (event) ->
  circle = $(event.currentTarget)
  name = circle.attr('name')

  success = activity.switchActivity(name)

  previouslySelected = $('div.container.activity > ul.nav').find('.selected');

  if success
    circle.addClass('selected')
    previouslySelected.removeClass('selected')

  return

# DOM is ready
$ ->
  $('.tooltip-target').hover tooltipTargetHover
  $('.tooltip-target').mouseleave tooltipTargetHoverOut
  $(".tooltip-target").click tooltipTargetClick

  $('div.dot').click dotNavClick
  $('a.circle.activityNav').click activityNavClick

  return