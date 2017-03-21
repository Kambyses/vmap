/*globals define*/

define(function (require) {
  "use strict";

  var
    $         = require("jquery"),
    Class     = require("Class"),
    map       = require("map");

  function BaseLayers() {
    Class.apply(this);
    this.layers  = [{
      "id":     "osgeoWMS",
      "name":   "OpenLayers WMS",
      "module": "osgeoWMS"
    }, {
      "id":     "maaametiWMS",
      "name":   "Maa-ameti WMS",
      "module": "maaametiWMS"
    }, {
      "id":     "regioTeed",
      "name":   "Regio teed",
      "module": "regioTeed"
    }];
    this.element = $("<ul />").addClass("vmap baseLayers");
    this.render();
    this.element.on("click", "a", this.activateLayer.bind(this));
  }

  BaseLayers.prototype = {

    render: function () {
      var layers = [], idx, len;
      for (idx = 0, len = this.layers.length; idx < len; idx += 1) {
        layers.push(
          $("<li />").addClass("vmap").append($("<a />").attr("href", "#" + this.layers[idx].id).html(this.layers[idx].name))
        );
      }
      this.element.append(layers);
    },

    activateLayer: function (layer) {
      var idx, len;
      layer = typeof layer === "object" && layer.currentTarget ? $(layer.currentTarget).attr("href").replace("#", "") : layer;

      for (idx = 0, len = this.layers.length; idx < len; idx += 1) {
        if (layer === this.layers[idx].id) {
          this.showLayer(this.layers[idx]);
          $("a[href='#" + layer + "']", this.element).parent().addClass("active").siblings(".active").removeClass("active");
        }
      }
    },

    showLayer: function (layer) {
      require([layer.module], function (layer) {
        if (!layer.map) {
          map.addLayer(layer);
          layer.setVisibility(true);
        }
      });
    }

  };

  return new (Class.extend(BaseLayers))();

});
