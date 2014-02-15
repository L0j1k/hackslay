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
  var _data = {
    objects: {
      canvas: {}
    },
    state: {
      started: false;
    }
  };

  var _event = function( object, event, action ) {
    if (window.addEventListener) {
      object.addEventListener(event, action, false);
    } else if (window.attachEvent) {
      object.attachEvent('on'+event, action);
    } else {
      console.log('*** Error: Cannot instantiate object!');
    }
  }

  var _init = function() {
    _data.objects['canvas'] = document.getElementById('hscanvas');
    _event(_data.objects.canvas, click, _startGame);
    return this;
  };

  var _startGame = function() {
    if (!_data.state.started) {
      _data.state.started == true;
      _hs.init();
    }
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
