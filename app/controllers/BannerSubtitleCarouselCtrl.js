// See https://angular-ui.github.io/bootstrap/#/carouselk
(function() {
  'use strict';

  function BannerSubtitleCarouselCtrl($scope)
  {
    var _this = this;

    _this.subtitles = [
      'Software Engineer',
      'Cat Lover',
      'Anime Fan',
      'Gamer'
    ];

    function _init() {
    }

    _init();
  }

  mdzhangPersonalSiteApp.controller('bannerSubtitleCarouselCtrl', BannerSubtitleCarouselCtrl);
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