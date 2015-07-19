var mdzhangPersonalSiteApp = angular.module('mdzhangPersonalSiteApp', ['ui.router', 'ui.bootstrap']);

(function () {

  mdzhangPersonalSiteApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    // TODO: find a better way to serve this locally
    var path = 'http://localhost:3000/public/build/html';

    var getPath = function(file) {
      return path + file;
    };

    // Default url.
    $urlRouterProvider
      .otherwise('/home');

    $stateProvider
      .state('/home', {
        url: '/home',
        templateUrl: getPath('/home.html')
      })
      .state('/activity', {
        url: '/activity',
        templateUrl: '/activity.html'
      })
      .state('/blog', {
        url: '/blog',
        templateUrl: '/construction.html'
      })
      .state('/projects', {
        url: '/projects',
        templateUrl: '/construction.html'
      })
      .state('/resume', {
        url: '/resume',
        templateUrl: '/resume.html'
      })
      .state('/contact', {
        url: '/contact',
        templateUrl: '/contact.html'
      });
  }]);
})();