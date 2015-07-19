var mdzhangPersonalSiteApp = angular.module('mdzhangPersonalSiteApp', ['ui.router', 'ngAnimate']);

(function () {

  mdzhangPersonalSiteApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    // TODO: find a better way to serve this locally
    var path = 'http://localhost:3000/public/build/html';

    var getHtmlPath = function(file) {
      return path + file;
    };

    // Default url.
    $urlRouterProvider
      .otherwise('/home');

    $stateProvider
      .state('/home', {
        url: '/home',
        templateUrl: getHtmlPath('/home.html')
      })
      .state('/activity', {
        url: '/activity',
        templateUrl: getHtmlPath('/activity.html')
      })
      .state('/blog', {
        url: '/blog',
        templateUrl: getHtmlPath('/construction.html')
      })
      .state('/projects', {
        url: '/projects',
        templateUrl: getHtmlPath('/construction.html')
      })
      .state('/resume', {
        url: '/resume',
        templateUrl: getHtmlPath('/resume.html')
      })
      .state('/contact', {
        url: '/contact',
        templateUrl: getHtmlPath('/contact.html')
      });
  }]);
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