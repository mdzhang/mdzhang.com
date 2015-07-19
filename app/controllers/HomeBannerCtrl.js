(function() {
  'use strict';

  function HomeBannerCtrl($scope, $state, $q, $timeout)
  {
    var _this = this;

    _this.subtitles = [
      'Software Engineer',
      'Cat Lover',
      'Anime Fan',
      'Gamer'
    ];

    _this.interval = 3000; // ms

    $scope.subtitle = null;

    /**
     * Loops the subtitle in the home banner.
     */
    function _loopSubtitles() {

      function subtitleLoop(subtitle) {
        return $timeout(function() {
          // slide out old value $animate.addClass('.slideLeftOut')
          $scope.subtitle = subtitle;
          // slide in new value $animate.addClass('.slideLeftIn')
          console.log('switched subtitle: ', subtitle);
        }, _this.interval);
      }

      var subtitleLoopPromise = $q.resolve();

      _.each(_this.subtitles, function(subtitle) {
        subtitleLoopPromise = subtitleLoopPromise.then(function() {
          return subtitleLoop(subtitle);
        });
      });

    }

    function _init() {
      $scope.subtitle = _this.subtitles[0];
      _loopSubtitles();
    }

    _init();
  }

  mdzhangPersonalSiteApp.controller('homeBannerCtrl', HomeBannerCtrl);
})();

// Controller Template
// (function() {
//   'use strict';

//   function Ctrl($scope)
//   {
//     var _this = this;

//     function _init() {
//     }

//     _init();
//   }

//   mdzhangPersonalSiteApp.controller('ctrl', Ctrl);
// })();