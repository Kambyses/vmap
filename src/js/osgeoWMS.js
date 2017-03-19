/*globals define*/

define(function (require) {
  "use strict";

  var
    OpenLayers = require("OpenLayers"),
    namespace  = require("namespace"),
    osgeoWMS   = new OpenLayers.Layer.WMS("OpenLayers WMS", "http://vmap0.tiles.osgeo.org/wms/vmap0", { "layers": "basic"})
  ;

  namespace.append("osgeoWMS", osgeoWMS);
  return osgeoWMS;

});
