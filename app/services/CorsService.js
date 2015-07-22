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
    _this.request = function(url, format, cb) {

      var proxyUrl = 'http://query.yahooapis.com/v1/public/yql?q=' +
        encodeURIComponent('select * from xml where url="' + url + '"') + '&format=xml&callback=?';

      function yqlCallback(data) {
        if (data && data.results && data.results.length) {
          var xml = $.parseXML(data.results[0]);
          var results = $.xml2json(xml);
          cb(null, results);
        } else {
          cb(data);
        }
      }

      $.getJSON(proxyUrl, yqlCallback);
    };

    function _init() {
    }

    _init();
  }

  mdzhangPersonalSiteApp.service('corsService', CorsService);
})();