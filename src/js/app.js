/*globals define*/

define(function (require) {
  "use strict";

  var map, $;

  require("css!../css/common.css");
  require("css!../vendors/fontawesome/css/font-awesome.min.css");
  require("sidebar");

  $   = require("jquery");
  map = require("map");

  $(".view-loader").hide();
});
