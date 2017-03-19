/*globals define, window*/

define(function () {
  "use strict";

  window.app = window.app || {};

  return {

    append: function (key, obj) {
      if (typeof key !== "string") {
        obj = key;
        key = null;
      }
      if (!key) {
        if (typeof obj === "function") {
          key = obj.name;
          obj.prototype.constructorLcName = obj.name.replace(/^(\w)?/, function (match) { return match.toLowerCase(); });
        } else if (typeof obj === "object") {
          key = obj.constructorLcName || obj.sid || obj.id || obj.name;
        }
      }
      if (key) {
        window.app[key] = obj;
      }
    }

  };

});
