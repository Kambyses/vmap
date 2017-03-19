/*globals define*/

define(function (require) {
  "use strict";

  var
    $          = require("jquery"),
    OpenLayers = require("OpenLayers"),
    map        = new OpenLayers.Map($(".vmap.map")[0], { "theme": null, "numZoomLevels": 20 }),
    osgeoWMS   = require("osgeoWMS"),
    namespace  = require("namespace")
  ;

  map.addLayer(osgeoWMS);
  map.zoomToMaxExtent();

  namespace.append("map", map);

  return map;

});
