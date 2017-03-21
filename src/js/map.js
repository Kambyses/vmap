/*globals define*/

define(function (require) {
  "use strict";

  var
    $          = require("jquery"),
    OpenLayers = require("OpenLayers"),
    map        = new OpenLayers.Map(
      $(".vmap.map")[0],
      {
        "theme":              null,
        "projection":			    new OpenLayers.Projection("EPSG:3301"),
        "displayProjection":  new OpenLayers.Projection("EPSG:3301"),
        "minZoom":            3,
        "maxExtent":			    new OpenLayers.Bounds(-211000, 5732000, 1325000, 7268000)
      }
    ),
    maaametiWMS = require("maaametiWMS"),
    namespace   = require("namespace");

  map.addLayer(maaametiWMS);
  map.zoomToMaxExtent();

  namespace.append("map", map);

  return map;

});
