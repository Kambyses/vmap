/*globals require*/

require.config({
  "baseUrl":       "js",
  "urlArgs":       null,
  "waitSeconds":   300,
  "supressErrors": false,
  "paths": {
    "app":          "app",
    "css":          "../../vendors/requirejs/plugins/css.min",
    "text":         "../../vendors/requirejs/plugins/text.min",
    "json":         "../../vendors/requirejs/plugins/json.min",
    "jquery":       "../../vendors/jquery/jquery-3.1.1.min",
    "OL":           "../../vendors/OpenLayers/OpenLayers.debug",
    "proj4js":      "../../vendors/proj4js/dist/proj4"
  },

  "shim": {
    "app":          { "deps": [ "jquery" ] }
  }

});

require(["app"]);
