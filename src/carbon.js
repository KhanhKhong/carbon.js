/**
 * @author arodic / http://akirodic.com/
 */

/*
  Carbon provides a simple way to create hierarchically composable JavaScript Elements.
  See README.md for more information.
*/

var Carbon = {};

Carbon.Revision = '0.0.1';

(function() {

  'use strict';

  /**
   * Creates Carbon.Element properties on specified target by calling Carbon.Element.
   * If superclass is specified, its constructor is called before Carbon.Element.
   *
   * @param {Object} target Target object to become Carbon.Element.
   * @param {Object} config Element property configuration.
   * @param {Object} [superclass] Class to extend and wrap as Element.
   */
  Carbon.call = function(target, config, superclass) {

    if (typeof superclass === 'function') {
      superclass.call(target, config);
      Carbon.Element.call(target, config);
    } else {
      Carbon.Element.call(target, config);
    }

  };

  /**
   * Extends specified subclass from Carbon.Element.
   * If superclass is specified, is will be extended instead before Carbon.Element methods are applied.
   *
   * @param {Object} subclass Subclass to extend from Carbon.Element.
   * @param {Object} [superclass] Superclass to extend.
   */
  Carbon.create = function(subclass, superclass) {

    if (typeof superclass === 'function') {

      subclass.prototype = Object.create(superclass.prototype);
      subclass.prototype.registerProperty = Carbon.Element.prototype.registerProperty;
      subclass.prototype.registerProperties = Carbon.Element.prototype.registerProperties;
      subclass.prototype.bindProperty = Carbon.Element.prototype.bindProperty;
      subclass.prototype.addEventListener = Carbon.Element.prototype.addEventListener;
      subclass.prototype.removeEventListener = Carbon.Element.prototype.removeEventListener;
      subclass.prototype.dispatchEvent = Carbon.Element.prototype.dispatchEvent;
      subclass.prototype.debounce = Carbon.Element.prototype.debounce;
      subclass.prototype._uuidChanged = Carbon.Element.prototype._uuidChanged;
      subclass.prototype.dispose = Carbon.Element.prototype.dispose;

    } else {

      subclass.prototype = Object.create(Carbon.Element.prototype);

    }

    subclass.prototype.constructor = subclass;

  };

}());
