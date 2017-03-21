/*globals define*/

define(function (require) {
  "use strict";

  var
    OpenLayers = require("OpenLayers"),
    namespace  = require("namespace"),
    regioTeed  = new OpenLayers.Layer.TMS(
      "Regio teed",
      "https://pump.reach-u.com/regiovk-eesti/",
      {
        "maxResolution":		  1500,
        "alwaysInRange":		  true,
        "resolutions":		    [750, 375, 187.5, 93.75, 46.875, 23.4375, 11.71875, 5.859375, 2.9296875, 1.46484375, 0.732421875, 0.3662109375, 0.18310546875],
        "tileOrigin":			    new OpenLayers.LonLat(-211000, 5732000),
        "serviceVersion":		  "1.0.0",
        "serverResolutions":  [6000, 3000, 1500, 750, 375, 187.5, 93.75, 46.875, 23.4375, 11.71875, 5.859375, 2.9296875, 1.46484375, 0.732421875, 0.3662109375, 0.18310546875],
        "units":				      "m",
        "zoomOffset":			    0,
        "isBaseLayer":		    true,
        "transitionEffect":	  "resize",
        "type":				        "png",
        "visibility":			    true
      }
    );

  regioTeed.getURL = function (bounds) {
    bounds = this.adjustBounds(bounds);
    var
      res = this.getServerResolution(),
      x = Math.round((bounds.left - this.tileOrigin.lon) / (res * this.tileSize.w)),
      y = Math.round((bounds.bottom - this.tileOrigin.lat) / (res * this.tileSize.h)),
      z = this.getServerZoom();
    return this.url.replace(/(\/\d+\/\d+\/\d+)/,  '/' + z + '/' + x + '/' + y);
  };

  namespace.append("regioTeed", regioTeed);
  return regioTeed;

});
