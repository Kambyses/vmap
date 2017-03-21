/*globals define*/

define(function (require) {
  "use strict";

  var
    $          = require("jquery"),
    Class      = require("Class"),
    baseLayers = require("baseLayers");

  function Sidebar() {
    Class.apply(this);
    this.element = $(".sidebar");
    $("[name='toggle-sidebar']").click(this.toggle.bind(this));

    this.element.append(baseLayers.element);
  }

  Sidebar.prototype = {

    toggle: function () {
      this.element.toggleClass("hidden");
    }

  };

  return new (Class.extend(Sidebar))();

});
