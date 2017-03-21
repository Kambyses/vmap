/*jslint maxlen:250*/

"use strict";

module.exports = function (grunt) {

  grunt.initConfig({
    "pkg":   grunt.file.readJSON("package.json"),

    "project": {},

    "jshint": {
      "files": [ "Gruntfile.js", "src/**/*.js", "src/**/*.json" ],
      "options": {
        "jshintrc": ".jshintrc",
        "ignores":  [ ]
      }
    },

    "clean": {
      "files": [ "dist" ]
    },

    "watch": {
      "tasks": [ "jshint" ],
      "files": [
        "Gruntfile.js",
        "src/**/*.js",
        "src/**/*.json",
        "src/**/*.css",
        "src/**/*.scss",
        "src/**/*.html"
      ]
    },

    "requirejs": {
      "app": {
        "options": {
          //"mainConfigFile":          "src/js/config.js",
          "baseUrl":                 "src",
          "dir":                     "dist",
          "optimize":                "uglify2",
          "fileExclusionRegExp":     /^(node_modules|vendors|scss)/,
          "optimizeCss":             "standard",
          "preserveLicenseComments": true,
          "removeCombined":          true,
          "generateSourceMaps":      false,
          "findNestedDependencies":  true,
          "paths1": {
            "requireLib": "require"
          },
          "uglify": {
            "options": {}
          }
        }
      },
      "vendors": {
        "options": {
          "baseUrl":                 "vendors/",
          "dir":                     "dist/vendors/",
          "optimize":                "none",
          "optimizeCss":             "none",
          "preserveLicenseComments": true,
          "removeCombined":          true,
          "generateSourceMaps":      false,
          "findNestedDependencies":  false,
          "uglify": {
            "options": {}
          }
        }
      }
    },

    "jsonmin": {
      "build": {
        "files": {
          "dist/js/i18n/et.json": "src/js/i18n/et.json",
          "dist/js/i18n/en.json": "src/js/i18n/en.json"
        }
      }
    },

    "copy": {
      "vendors": {
        "files": [
          { "src": "vendors/requirejs/require.min.js",                "dest": "dist/vendors/requirejs/require.min.js" },
          { "src": "vendors/requirejs/plugins/css.min.js",            "dest": "dist/vendors/requirejs/plugins/css.min.js" },
          { "src": "vendors/requirejs/plugins/json.min.js",           "dest": "dist/vendors/requirejs/plugins/json.min.js" },
          { "src": "vendors/requirejs/plugins/text.min.js",           "dest": "dist/vendors/requirejs/plugins/text.min.js" },
          { "src": "vendors/jquery/jquery-3.1.1.min.js",              "dest": "dist/vendors/jquery/jquery-3.1.1.min.js" },
          { "src": "vendors/OpenLayers/OpenLayers.js",                "dest": "dist/vendors/OpenLayers/OpenLayers.min.js" },
          { "src": "vendors/OpenLayers/theme/default/style.tidy.css", "dest": "dist/vendors/OpenLayers/theme/default/style.css" },
          { "cwd": "vendors/OpenLayers/theme/default/img",            "dest": "dist/vendors/OpenLayers/theme/default/img", "src": ["**"], "expand": true },
          { "src": "vendors/proj4js/dist/proj4.js",                   "dest": "dist/vendors/proj4js/proj4.min.js" },
          { "src": "vendors/fontawesome/css/font-awesome.min.css",    "dest": "dist/vendors/fontawesome/css/font-awesome.min.css" },
          { "cwd": "vendors/fontawesome/fonts",                       "dest": "dist/vendors/fontawesome/fonts", "src": ["**"], "expand": true }
        ]
      }
    },

    "replace": {
      "dist": {
        "src":       [ "dist/index.html", "dist/js/config.js", "dist/js/app.js", "dist/js/OpenLayers.js" ],
        "overwrite": true,
        "replacements": [
          { "from": '"js/config.js"',               "to": '"js/config.js?_v=' + new Date().toISOString().replace("T", "-").replace(/:/g, "-").substr(0, 19) + '"' },
          { "from": 'urlArgs:null',                 "to": 'urlArgs:"_v=' + new Date().toISOString().replace("T", "-").replace(/:/g, "-").substr(0, 19) + '"' },
          { "from": "../vendors/requirejs/",        "to": "vendors/requirejs/" },
          { "from": "../../vendors/",               "to": "../vendors/" },
          { "from": "OpenLayers/OpenLayers.debug",  "to": "OpenLayers/OpenLayers.min" },
          { "from": 'proj4js/dist/proj4"',          "to": 'proj4js/proj4.min"' }
        ]
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-requirejs");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-jsonmin');
  grunt.loadNpmTasks("grunt-keepalive");
  grunt.loadNpmTasks("grunt-text-replace");

  grunt.registerTask("build", [ "jshint", "clean", "requirejs:app", "copy:vendors", "replace" ]);


  grunt.registerTask("serve", function (moduleName) {
    grunt.task.run([(moduleName !== undefined) ? "proxyRestServer:" + moduleName : "proxyRestServer", "serveLocalHost", "watch", "keepalive"]);
  });

  grunt.registerTask("serveLocalHost", "", function () {
    var open, port;
    if (grunt.option("open-browser")) {
      open = require("open");
      port = (grunt.option("server-port") === undefined) ? 9999 : grunt.option("server-port");
      open("http://127.0.0.1:" + port);
    }
  });


  grunt.registerTask("proxyRestServer", 'Start a custom web server.', function (moduleName) {
    var apiUrl, apiPort, serverPort, express, app, path, http, devRest, url, cors, uri, filePath, workingDir; /* , cwd, serverCfg*/
    express = require("express");
    path    = require("path");
    url     = require("url");
    app     = express();
    http    = require("http");
    cors    = require("cors");
    devRest = require("dev-rest-proxy");
    apiUrl  = grunt.option("api") === undefined ? "192.168.115.52" : grunt.option("api");
    apiPort = grunt.option("api-port") === undefined ? 80 : grunt.option("api-port");
    serverPort = (grunt.option('server-port') === undefined) ? 9999 : grunt.option('server-port');

    if (apiUrl === undefined) {
      grunt.fail.error("Api parameter has not been defined. ( i.e. --api=192.168.115.52 )");
      return false;
    }
    if (moduleName !== undefined) {
      workingDir = path.resolve(path.join("modules", moduleName));
      if (!grunt.file.exists(workingDir) && !grunt.file.isDir(workingDir)) {
        grunt.log.error("Module with name \"" + moduleName + "\" not found.");
        return false;
      }
    }

    app.use(cors());

    app.use(function (req, res, next) {
      grunt.log.writeln(Date.now() + " " + req.method + " " + req.url);
      grunt.log.writeln(res);
      next();
    });

    if (moduleName === undefined) {
      app.use(express["static"]("src"));
      app.get(["/bower_components/*", "/libs/*", "/modules/*", "/locales/*", "/vendors/*"], function (req, res) {
        uri = url.parse(req.url).pathname;
        filePath = path.join(path.resolve("./"), uri);// jshint ignore:line
        res.sendFile(filePath);
      });
    } else {
      app.use(express["static"](path.join("modules", moduleName, "dist")));
    }
    app.get("/api/*", function (req, res) {
      devRest.proxy(req, res, apiUrl, apiPort);
    });
    app.put("/api/*", function (req, res) {
      devRest.proxy(req, res, apiUrl, apiPort);
    });
    app.post("/api/*", function (req, res) {
      devRest.proxy(req, res, apiUrl, apiPort);
    });
    app.post("/oauth/*", function (req, res) {
      devRest.proxy(req, res, apiUrl, apiPort);
    });
    app["delete"]("/api/*", function (req, res) {
      devRest.proxy(req, res, apiUrl, apiPort);
    });
    http.createServer(app).listen(serverPort, function () {
      grunt.log.writeln("Server started at http://localhost:" + serverPort);
    });
  });

};
