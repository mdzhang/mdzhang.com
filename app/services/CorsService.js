(function() {
  'use strict';

  // Cross-Origin Resource Sharing Service
  function CorsService()
  {
    var _this = this;

    /**
     * Makes cross origin requests easier.
     * TODO: Update for flexibility as necessary.
     */
    _this.request = function(url, options, cb) {
      options = options || {};

      url += _.chain(options.params).map(function(value, key) {
        return key + '=' + value;
      }).join('&').value();

      var proxyUrl = 'http://query.yahooapis.com/v1/public/yql?';
      var proxyUrlParams = {
        q: encodeURIComponent('select * from ' + options.format + ' where url="' + url + '"'),
        format: options.format,
        callback: '?'
      };

      proxyUrl += _.chain(proxyUrlParams).map(function(value, key) {
        return key + '=' + value;
      }).join('&').value();

      $.getJSON(proxyUrl, cb);
    };

    function _init() {
    }

    _init();
  }

  mdzhangPersonalSiteApp.service('corsService', CorsService);
})();