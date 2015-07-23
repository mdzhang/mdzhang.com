(function() {
  'use strict';

  function MenubarDirective($state)
  {
    function link($scope, $element, $attrs) {
      var _this = {};

      _this.items = $scope.items = [
        {
          text: 'Home',
          route: '/home'
        },
        {
          text: "What I'm Up To",
          route: '/activity'
        },
        {
          text: 'Blog',
          route: '/blog'
        },
        {
          text: 'Projects',
          route: '/projects'
        },
        {
          text: 'Resume',
          route: '/resume'
        },
        {
          text: 'Contact',
          route: '/contact'
        }
      ];

      $scope.go = function(item) {
        $state.go(item.route);
      };

      /**
       * Init logic.
       */
      function _init() {
      }

      _init();
    } // end of link

    return {
      templateUrl: 'templates/menubar.html',
      link: link,
      scope: {}
    };
  }

  mdzhangPersonalSiteApp.directive('menubar', MenubarDirective);
})();