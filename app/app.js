(function () {
  'use strict';
  console.log('Loading angular app...');

  var mdzhangPersonalSiteApp = angular.module('mdzhangPersonalSiteApp', ['ui.router']);

  mdzhangPersonalSiteApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    // Default url.
    $urlRouterProvider
      .otherwise('/home');

    $stateProvider
      .state('/home', {
        url: '/home',
        templateUrl: '/home.html'
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