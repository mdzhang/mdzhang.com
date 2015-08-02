dotHover = (event) ->
  dot = $(event.target)
  selectedLi = dot.parent()
  ul = selectedLi.parent()
  currentLi = ul.find('.current')

  if selectedLi.is currentLi
    return

  # Bring to front (e.g. for tooltip)
  selectedLi.css('z-index', 1000)

  # Show tooltip
  selectedLi
    .find('.tooltip')
    .css(
      visibility: 'visible',
      opacity: 1
    )

  if !currentLi
    return

  # Make current tooltip fade
  currentLi
    .find('.tooltip')
    .css('opacity', 0.5)

dotHoverOut = (event) ->
  dot = $(event.target)
  selectedLi = dot.parent()
  ul = selectedLi.parent()
  currentLi = ul.find('.current')

  selectedLi.css('z-index', 999)

  # If mousing out of current dot, do nothing
  if selectedLi.is currentLi
    return

  # Hide tooltip
  selectedLi
    .find('.tooltip')
    .css(
      visibility: 'hidden',
      opacity: 0
    )

  # Restore current tooltip
  ul
    .find('.current')
    .find('.tooltip')
    .css('opacity', 1)


dotClick = (event) ->
  dot = $(event.target)
  selectedLi = dot.parent()
  ul = selectedLi.parent()
  currentLi = ul.find('.current')

  # If clicking current dot, do nothing
  if selectedLi.is currentLi
    return

  if currentLi
    # Unmark existing current class
    currentLi.removeClass 'current'

    currentLi
    .find('.tooltip')
    .css(
      visibility: 'hidden',
      opacity: 0
    )

  # Select new dot as current
  selectedLi.addClass 'current'

# DOM is ready
$ ->
  $('.tooltip-target').hover dotHover
  $('.tooltip-target').mouseleave dotHoverOut
  $(".tooltip-target").click dotClick
