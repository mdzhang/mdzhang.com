(function() {
  'use strict';

  function BannerSubtitleDirective($timeout, $q, $animate)
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

      _this.subtitleElement = $element[0].children[0];

      /**
       * Scope variables
       */
      $scope.subtitle = null;

      /**
       * Infinitely loops the subtitle in the home banner.
       */
      function _infinitelyLoopSubtitles() {
        var nextSubtitle = _this.subtitles[
          (_.indexOf(_this.subtitles, $scope.subtitle) + 1) % _this.subtitles.length
        ];

        $q.resolve()
          .then(function() {
            return $timeout(function() {
              // NB: We _must_ update the scope subtitle _after_ we start the animation,
              //     else the user will first see a blink to the next subtitle, and then see
              //     the next subtitle animated into the screen, since we can change the subtitle
              //     value near instantaneously, but the animation takes 1 second +.
              angular.element(_this.subtitleElement).addClass('slideInFromRight');
              $scope.subtitle = nextSubtitle;
            }, _this.interval);
          })
          .then(function() {
            return $timeout(function() {
              angular.element(_this.subtitleElement).removeClass('slideInFromRight');
            }, _this.interval);
          })
          .then(function() {
            _infinitelyLoopSubtitles();
          });
      }

      /**
       * Init logic.
       */
      function _init() {
        $scope.subtitle = _this.subtitles[0];
        _infinitelyLoopSubtitles();
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