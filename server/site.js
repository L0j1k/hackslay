/**
 * @project hackslay
 * Hackslay, an HTML5/JavaScript derivitive of nethack.
 * @file site.js
 * Site support javascript file.
 * @author L0j1k
 * @contact L0j1k@L0j1k.com
 * @version 0.0.1_prealpha
 */

var _site = (function() {
  var _init = function() {
    return {};
  };

  return {
    init: _init
  };
})();

if (window.addEventListener) {
  window.addEventListener('load', _site.init, false);
} else if (window.attachEvent) {
  window.attachEvent('onload', _site.init);
} else {
  console.log('*** Error: Cannot instantiate site object!');
}
