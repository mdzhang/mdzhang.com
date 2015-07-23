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
        var nextSubtitleIndex = (_.indexOf(_this.subtitles, $scope.subtitle) + 1) % _this.subtitles.length;
        var nextSubtitle = _this.subtitles[nextSubtitleIndex];

        $q.resolve()
          .then(function() {
            // Angular seems to not clear the binded value when the subtitle element is slid out,
            // so hide the whole directive, so only the subtitle can be seen sliding out to the left.
            // TODO: This is a hack, and its cause is not yet fully understood.
            $element.css({ visibility: 'hidden' });
            angular.element(_this.subtitleElement).addClass('slideOutToLeft');

            // Wait for the subtitle to finish sliding out to the left before we remove the class
            // so we can slide it out anew next time.
            return $timeout(function() {
              angular.element(_this.subtitleElement).removeClass('slideOutToLeft');
            }, 1000);
          })
          .then(function() {
            // Re-reveal the directive. See above for why we hid it in the first place.
            $element.css({ visibility: 'visible' });
            // NB: We _must_ update the scope subtitle _after_ we start the animation,
            //     else the user will first see a blink to the next subtitle, and then see
            //     the next subtitle animated into the screen, since we can change the subtitle
            //     value near instantaneously, but the animation takes 1 second +.
            angular.element(_this.subtitleElement).addClass('slideInFromRight');
            $scope.subtitle = nextSubtitle;

            // Wait for the slideInFromRight animation to finish before we try to remove the class
            // so we can slide in the next subtitle.
            $timeout(function() {
              angular.element(_this.subtitleElement).removeClass('slideInFromRight');
            }, 2000);
          })
          .then(function() {
            // Wait before looping the next subtitle in.
            return $timeout(function() {
              _infinitelyLoopSubtitles();
            }, _this.interval);
          });
      }

      /**
       * Init logic.
       */
      function _init() {
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