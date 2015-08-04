mode = 'local'
corsProxyUrl = 'http://crossorigin.me/'

Activity = () ->
  _this = @

  _this.init = () ->
    _this.books = []
    _this.shows = []
    _this.games = []
    _this.loading = true
    _this.current = 'game'

    Promise.join(_this.getBooks(), _this.getAnime(), _this.getGames(), (books, anime, games) ->
      _this.books = books
      _this.shows = anime
      _this.games = games

      _this.render()
      _this.loading = false

      return
    )

  _this.render = () ->
    data = _this[_this.current + 's']
    template = $.templates('#' + _this.current + 'Template')
    html = template.render(data)

    $('.activity').html(html)
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
      shelf: 'to-read',
      key: 'P78YnKD8IcTJLSJM6OwWw',
      # user_id: '13686342'

    return _this.request('GET', url, params)
      .then (xml) -> # success
        json = $.xml2json(xml)
        books = _this.formatGoodreadsResponse(json)

        if books
          books = _this.formatSteamResponse(books)
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

      _.each(books, (book) ->
        book.book.started_at = book.started_at

        if _.isArray(book.book.authors.author)
          book.book.author = book.book.authors.author[0]
        else if _.isObject(book.book.authors.author)
          book.book.author = book.book.authors.author

        return
      )

      books = _.pluck(books, 'book')

      return books

  ###
    Request anime I'm watching from MAL-api, built on top of MyAnimeList.
  ###
  _this.getAnime = () ->
    url = 'https://api.atarashiiapp.com/animelist/eeemaroo'

    return _this.request('GET', url, {})
      .then (data) -> # success
        anime = data && data.anime

        if anime
          anime = _this.formatMALApiResponse(anime)
          console.info 'Fetched MyAnimeList anime: ', anime
        else
          throw new Error('Given bad data: ' + data)

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

  return

Activity()
