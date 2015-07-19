// TODO: make into module
(function() {
  'use strict';

  function SlideOutToLeftAnimation($timeout, $animate)
  {
    return {
      addClass: function(element, className, done) {

        element.css({
          'animation-name': 'slideOutToLeft',
          '-webkit-animation-name': 'slideOutToLeft',

          'animation-duration': '2s',
          '-webkit-animation-duration': '2s',

          'animation-timing-function': 'ease-in-out',
          '-webkit-animation-timing-function': 'ease-in-out',

          visibility: 'visible !important'
        });

        done();
      },
      removeClass: function(element, className, done) {
        done();
      },
      setClass: function(element, addedClass, removedClass, done) {
        // do some cool animation and call the doneFn
      }
    };
  }

  function SlideInFromRightAnimation($timeout)
  {
    return {
      addClass: function(element, className, done) {

        // element.css({
        //   'animation-name': 'slideInFromRight',
        //   '-webkit-animation-name': 'slideInFromRight',

        //   'animation-duration': '2s',
        //   '-webkit-animation-duration': '2s',

        //   'animation-timing-function': 'ease-in-out',
        //   '-webkit-animation-timing-function': 'ease-in-out',

        //   visibility: 'visible !important'
        // });

        done();
      },
      removeClass: function(element, className, done) {
        done();
      },
      setClass: function(element, addedClass, removedClass, done) {
        // do some cool animation and call the doneFn
      }
    };
  }

  // mdzhangPersonalSiteApp.animation('.slideOutToLeft', SlideOutToLeftAnimation);
  // mdzhangPersonalSiteApp.animation('.slideInFromRight', SlideInFromRightAnimation);
})();