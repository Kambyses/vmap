/*globals define*/

define(function (require) {
  "use strict";

  var namespace = require("namespace");

  function Class() {
    namespace.append(this);
  }

  Class.extend = function (Constructor) {
    var key, prototype;
    prototype = Object.create(this.prototype);
    for (key in Constructor.prototype) {
      if (Constructor.prototype.hasOwnProperty(key)) {
        prototype[key] = Constructor.prototype[key];
      }
    }
    Constructor.prototype = prototype;
    Constructor.extend = Class.extend;
    namespace.append(Constructor);
    return Constructor;
  };

  namespace.append(Class);

  return Class;

});
