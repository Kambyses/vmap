/*globals define, OpenLayers*/

define(function (require) {
  "use strict";

  var map, layer, $, OL;

  require("css!../css/common.css");
  $  = require("jquery");
  OL = require("OpenLayers");


  map = new OpenLayers.Map($(".vmap.map")[0], {
    "theme": null,
    "numZoomLevels": 20,
    "displayProjection": "EPSG:3301"
  });
  layer = new OpenLayers.Layer.WMS("OpenLayers WMS", "http://vmap0.tiles.osgeo.org/wms/vmap0", { "layers": "basic"});
  map.addLayer(layer);
  map.zoomToMaxExtent();

  $(".view-loader").hide();

});
