(function() {
  'use strict';

  function ActivityCtrl($scope, $http)
  {
    var _this = this;

    // What I'm...
    _this.titles = $scope.titles = [
      'Watching',
      'Playing',
      'Reading'
    ];

    /**
     * Scope variables
     */
    $scope.currentTitle = null;

    $scope.nextTitle = function() {
      $scope.currentTitle = _this.titles[
        (_.indexOf(_this.titles, $scope.currentTitle) + 1) % _this.titles.length
      ];
    };

    $scope.previousTitle = function() {
      var previousIndex = _.indexOf(_this.titles, $scope.currentTitle) - 1;
      if (previousIndex < 0) {
        previousIndex = _this.titles.length - 1;
      }

      $scope.currentTitle =  _this.titles[previousIndex];
    };

    /**
     * Request books I'm currently reading from Goodreads.
     */
    function _getBooks() {
      // See https://www.goodreads.com/api/index#reviews.list
      var url = 'https://www.goodreads.com/review/list/13686342?';
      var params = {
        format: 'xml',
        v: '2',
        shelf: 'currently-reading',
        key: 'P78YnKD8IcTJLSJM6OwWw',
        // user_id: '13686342'
      };

      url += _.chain(params).map(function(value, key) {
        return key + '=' + value;
      }).join('&').value();

      var proxyUrl = 'http://query.yahooapis.com/v1/public/yql?q=' +
        encodeURIComponent('select * from xml where url="' + url + '"') + '&format=xml&callback=?';

      function cb(data) {
        if (data && data.results && data.results.length) {
          var xml = $.parseXML(data.results[0]);
          var json = $.xml2json(xml);
          console.log('dom: ', xml);
          console.log('json: ', json);
        } else {
          console.error('Failed to fetch books from Goodreads');
        }
      }

      $.getJSON(proxyUrl, cb);
    }

    function _init() {
      $scope.currentTitle = _this.titles[0];
      _getBooks();
    }

    _init();
  }

  mdzhangPersonalSiteApp.controller('activityCtrl', ActivityCtrl);
})();