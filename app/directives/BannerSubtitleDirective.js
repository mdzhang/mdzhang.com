(function() {
  'use strict';

  function BannerSubtitleDirective($timeout, $q)
  {
    function link($scope, $element, $attrs) {
      var _this = {};

      _this.subtitles = [
        'Software Engineer',
        'Cat Lover',
        'Anime Fan',
        'Gamer'
      ];

      _this.interval = 3000; // ms

      /**
       * Scope variables
       */
      $scope.subtitle = null;

      /**
       * Loops the subtitle in the home banner.
       */
      function _loopSubtitles() {
        var nextSubtitle = _this.subtitles[
          (_.indexOf(_this.subtitles, $scope.subtitle) + 1) % _this.subtitles.length
        ];


        $q.resolve()
          .then(function() {
            return $timeout(function() {
              // slide out old value $animate.addClass('.slideLeftOut')
              $scope.subtitle = nextSubtitle;
              // slide in new value $animate.addClass('.slideLeftIn')
            }, _this.interval);
          })
          .then(function() {
            _loopSubtitles();
          });
      }

      /**
       * Init logic.
       */
      function _init() {
        $scope.subtitle = _this.subtitles[0];
        _loopSubtitles();
      }

      _init();
    } // end of link

    return {
      templateUrl: 'templates/bannerSubtitle.html',
      link: link,
      scope: {}
    };
  }

  mdzhangPersonalSiteApp.directive('bannerSubtitle', BannerSubtitleDirective);
})();