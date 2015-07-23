(function() {
  'use strict';

  // Cross-Origin Resource Sharing Service
  // To circumvent Access-Control-Allow-Origin errors.
  function CorsService($http)
  {
    var _this = this;

    _this.requestAsync = function(method, url, params) {
      url += _.chain(params).map(function(value, key) {
        return key + '=' + value;
      }).join('&').value();

      url = 'http://localhost:8000/path=' + url;
      params = {};

      var req = {
        method: method,
        url: url,
        data: params
      };

      return $http(req)
        .then(function(response) {
          if (response.status !== 200) {
            return new Error();
          } else {
            return response.data;
          }
        });
    };

    function _init() {
    }

    _init();
  }

  mdzhangPersonalSiteApp.service('corsService', CorsService);
})();