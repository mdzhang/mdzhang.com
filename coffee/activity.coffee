mode = 'local'
corsProxyUrl = 'http://crossorigin.me/'

Activity = () ->
  _this = {}

  _this.init = () ->
    _this.books = []
    _this.shows = []
    _this.games = []
    _this.loading = true
    _this.activities = ['game', 'book', 'show']
    _this.current = 'book'

    Promise.join(_this.getBooks(), _this.getAnime(), _this.getGames(), (books, anime, games) ->
      _this.books = books
      _this.shows = anime
      _this.games = games

      _this.render()
      _this.loading = false

      return
    )

  _this.switchActivity = (activity) ->
    if !_.contains(_this.activities, activity)
      console.error 'Invalid activity provided: ', activity
      return

    _this.current = activity
    _this.render()
    return true

  _this.render = () ->
    data = _this[_this.current + 's']
    template = $.templates('#' + _this.current + 'Template')
    html = template.render(data)

    $('.content').html(html)
    return

  _this.getCorsProxyUrl = (url, params) ->
    url += _.chain(params).map((value, key) ->
      return key + '=' + value
    ).join('&').value()

    url = corsProxyUrl + url

    return url

  _this.request = (method, url, params) ->

    url = _this.getCorsProxyUrl(url, params)

    settings =
      type: method
      url: url

    return Promise.resolve($.ajax(settings))

  ###
   Request games I've recently played from Steam.
  ###
  _this.getGames = () ->
    url = 'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?'

    params =
      key: 'FBADE7566BA2B38B1BC3BAD857FFFDB5'
      steamid: '76561198046100572'
      format: 'json'

    return _this.request('GET', url, params)
      .then (data) -> # success
        games = data && data.response && data.response.games

        if games
          games = _this.formatSteamResponse(games)
          console.info 'Fetched Steam games: ', games

        return games
      .catch (err) -> # error
        console.error 'Failed to fetch games from Steam', err

        return

  ###
  ###
  _this.formatSteamResponse = (games) ->
    baseImageUrl = 'http://cdn.akamai.steamstatic.com/steam/apps/'
    baseStorePageUrl = 'http://store.steampowered.com/app/'

    _.each(games, (game) ->
      imageUrl = baseImageUrl + game.appid + '/header.jpg'
      game.image_url = imageUrl
      game.link = baseStorePageUrl + game.appid

      return
    )

    return games;

  ###
   Request books I'm currently reading from Goodreads.
   See https://www.goodreads.com/api/index#reviews.list
  ###
  _this.getBooks = () ->
    url = 'https://www.goodreads.com/review/list/13686342?'
    params =
      format: 'xml',
      v: '2',
      shelf: 'currently-reading',
      key: 'P78YnKD8IcTJLSJM6OwWw',
      # user_id: '13686342'

    return _this.request('GET', url, params)
      .then (xml) -> # success
        json = $.xml2json(xml)
        books = _this.formatGoodreadsResponse(json)

        if books
          console.info 'Fetched Goodreads books: ', books

        return books
      .catch (err) -> # error
        console.error 'Failed to fetch books from Goodreads', err

        return

  ###
    Format Goodreads response so we can use it for this client
  ###
  _this.formatGoodreadsResponse = (data) ->
      books = []

      if _.isArray(data.reviews.review)
        books = data.reviews.review
      else if _.isObject(data.reviews.review)
        books = [data.reviews.review]

      books = _.pluck(books, 'book')

      _.each(books, (book) ->
        if _.isArray(book.authors.author)
          book.author = book.authors.author[0]
        else if _.isObject(book.authors.author)
          book.author = book.authors.author

        if book.image_url.indexOf('nophoto') > -1
          return
        else
          # e.g. "https://d.gr-assets.com/books/1406383612m/9969571.jpg"
          book.image_url = book.image_url.replace(/(books\/\d+)([a-z]{1})(\/\d+.*)/, '$1l$3')
        return
      )

      return books

  ###
    Request anime I'm watching from MAL-api, built on top of MyAnimeList.
  ###
  _this.getAnime = () ->
    url = 'https://api.atarashiiapp.com/1/animelist/eeemaroo'

    return _this.request('GET', url, {})
      .then (data) -> # success
        anime = data && data.anime

        if anime
          anime = _this.formatMALApiResponse(anime)
          console.info 'Fetched MyAnimeList anime: ', anime

        return anime
      .catch (err) -> # error
        console.error 'Failed to fetch anime from MyAnimeList', err

        return

  ###
  ###
  _this.formatMALApiResponse = (anime) ->
    baseShowUrl = 'http://myanimelist.net/anime/'
    currentlyWatching = _.groupBy(anime, 'watched_status').watching

    _.each(currentlyWatching, (anime) ->
      anime.link = baseShowUrl + anime.id
      return
    )

    return currentlyWatching;

  _this.init()

  return _this