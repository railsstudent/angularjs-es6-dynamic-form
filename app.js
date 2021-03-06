import angular from "angular";
import "@uirouter/angularjs";
import "angular-messages";

import "bootstrap/dist/css/bootstrap.min.css";
import "angular-ui-bootstrap/dist/ui-bootstrap-tpls";

// Import your app stylesheets
import "./style.css";

// Import your app functionality
import "./home";

import "./dynamic-form";

// Create and bootstrap application
const requires = ["ui.router", "ui.bootstrap", "ngMessages", "home", "dynamic"];

window.app = angular.module("app", requires);

angular.bootstrap(document.getElementById("app"), ["app"]);
