(function() {
  'use strict';

  function ActivityCtrl($scope)
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

    $scope.isCurrentTitle = function(title) {
      return title === $scope.currentTitle;
    };

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

    function _init() {
      $scope.currentTitle = _this.titles[0];
    }

    _init();
  }

  mdzhangPersonalSiteApp.controller('activityCtrl', ActivityCtrl);
})();