(function() {
  var Activity, dotNavClick, mainContent, mode, proxyServerUrl, toggle, tooltipTargetClick, tooltipTargetHover, tooltipTargetHoverOut;

  mode = 'local';

  proxyServerUrl = 'http://localhost:8000/path=';

  Activity = function() {
    var _this;
    _this = this;
    _this.init = function() {
      _this.books = [];
      _this.shows = [];
      _this.games = [];
      return Promise.join(_this.getBooks(), _this.getAnime(), _this.getGames(), function(books, anime, games) {
        _this.books = books;
        _this.shows = anime;
        _this.games = games;
      });
    };
    _this.request = function(url, params) {
      if (mode === 'local') {
        url += _.chain(params).map(function(value, key) {
          return key + '=' + value;
        }).join('&').value();
        params = {};
        url = proxyServerUrl + url;
      }
      return Promise.resolve($.get(url, params));
    };

    /*
     Request games I've recently played from Steam.
     */
    _this.getGames = function() {
      var params, url;
      url = 'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?';
      params = {
        key: 'FBADE7566BA2B38B1BC3BAD857FFFDB5',
        steamid: '76561198046100572',
        format: 'json'
      };
      return _this.request(url, params).then(function(data) {
        var games;
        games = data && data.response && data.response.games;
        if (games) {
          games = _this.formatSteamResponse(games);
          console.info('Fetched Steam games: ', games);
        }
        return games;
      })["catch"](function(err) {
        console.error('Failed to fetch games from Steam', err);
      });
    };

    /*
     */
    _this.formatSteamResponse = function(games) {
      var baseImageUrl, baseStorePageUrl;
      baseImageUrl = 'http://cdn.akamai.steamstatic.com/steam/apps/';
      baseStorePageUrl = 'http://store.steampowered.com/app/';
      _.each(games, function(game) {
        var imageUrl;
        imageUrl = baseImageUrl + game.appid + '/header.jpg';
        game.image_url = imageUrl;
        game.link = baseStorePageUrl + game.appid;
      });
      return games;
    };

    /*
     Request books I'm currently reading from Goodreads.
     See https://www.goodreads.com/api/index#reviews.list
     */
    _this.getBooks = function() {
      var params, url;
      url = 'https://www.goodreads.com/review/list/13686342?';
      params = {
        format: 'xml',
        v: '2',
        shelf: 'to-read',
        key: 'P78YnKD8IcTJLSJM6OwWw'
      };
      return _this.request(url, params).then(function(xml) {
        var books, json;
        json = $.xml2json(xml);
        books = _this.formatGoodreadsResponse(json);
        if (books) {
          books = _this.formatSteamResponse(books);
          console.info('Fetched Goodreads books: ', books);
        }
        return books;
      })["catch"](function(err) {
        console.error('Failed to fetch books from Goodreads', err);
      });
    };

    /*
      Format Goodreads response so we can use it for this client
     */
    _this.formatGoodreadsResponse = function(data) {
      var books;
      books = [];
      if (_.isArray(data.reviews.review)) {
        books = data.reviews.review;
      } else if (_.isObject(data.reviews.review)) {
        books = [data.reviews.review];
      }
      _.each(books, function(book) {
        book.book.started_at = book.started_at;
        if (_.isArray(book.book.authors.author)) {
          book.book.author = book.book.authors.author[0];
        } else if (_.isObject(book.book.authors.author)) {
          book.book.author = book.book.authors.author;
        }
      });
      books = _.pluck(books, 'book');
      return books;
    };

    /*
      Request anime I'm watching from MAL-api, built on top of MyAnimeList.
     */
    _this.getAnime = function() {
      var url;
      url = 'https://api.atarashiiapp.com/animelist/eeemaroo';
      return _this.request(url, {}).then(function(data) {
        var anime;
        anime = data && data.anime;
        if (anime) {
          anime = _this.formatMALApiResponse(anime);
          console.info('Fetched MyAnimeList anime: ', anime);
        }
        return anime;
      })["catch"](function(err) {
        console.error('Failed to fetch anime from MyAnimeList', err);
      });
    };

    /*
     */
    _this.formatMALApiResponse = function(anime) {
      var baseShowUrl, currentlyWatching;
      baseShowUrl = 'http://myanimelist.net/anime/';
      currentlyWatching = _.groupBy(anime, 'watched_status').watching;
      _.each(currentlyWatching, function(anime) {
        anime.link = baseShowUrl + anime.id;
      });
      return currentlyWatching;
    };
    _this.init();
  };

  Activity();

  mainContent = {
    'Home': '.blurb',
    'Activity': '.activity',
    'Projects': '.projects',
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
      case 'Projects':
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
