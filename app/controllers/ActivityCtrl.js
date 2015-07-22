(function() {
  'use strict';

  function ActivityCtrl($scope, $http, corsService)
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
    // Current title on display in banner i.e. one of _this.titles
    $scope.currentTitle = null;
    // Books to be shown in "What I'm Reading" section
    $scope.books = null;

    $scope.isCurrentTitle = function(title) {
      return title === $scope.currentTitle;
    }

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
        shelf: 'to-read',
        key: 'P78YnKD8IcTJLSJM6OwWw',
        // user_id: '13686342'
      };

      url += _.chain(params).map(function(value, key) {
        return key + '=' + value;
      }).join('&').value();

      corsService.request(url, 'json', function(err, data) {
        if (err) {
          console.log('Failed to fetch books from Goodreads');
        } else {
          var books = _formatGoodreadsResponse(data);
          $scope.books = books;

          if (!$scope.$$phase) {
            $scope.$apply();
          }

          console.log('scope book: ', $scope.books);
        }
      });
    }

    /**
     * Format Goodreads response so we can use it for this client.
     */
    function _formatGoodreadsResponse(data) {
      var books = [];
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
    }

    function _init() {
      $scope.currentTitle = _this.titles[0];
      _getBooks();
    }

    _init();
  }

  mdzhangPersonalSiteApp.controller('activityCtrl', ActivityCtrl);
})();