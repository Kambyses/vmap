/*globals define*/

define(function (require) {
  "use strict";

  var
    OpenLayers  = require("OpenLayers"),
    namespace   = require("namespace"),
    maaametiWMS = new OpenLayers.Layer.WMS(
      "Põhikaart",
      "http://kaart.maaamet.ee/wms/kaart",
      {
        "layers":         "CORINE,BAASKAART,KAART24,HALDUSPIIRID",
        "format":         "image/png",
        "transparent":    true
      },
      {
        "layerId":        "BAASKAART_WMS",
        "singleTile":     true,
        "isBaseLayer":    true,
        "ratio":          1,
        "numZoomLevels":  17
      }
    );

  namespace.append("maaametiWMS", maaametiWMS);
  return maaametiWMS;

});
