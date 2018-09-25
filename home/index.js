import angular from "angular";

import "./style.scss";

// Create the module where our functionality can attach to
const homeModule = angular.module("home", []);

// Include our UI-Router config settings
import HomeConfig from "./home.config";

// Controllers
import HomeCtrl from "./home.controller";

homeModule.config(HomeConfig).controller("HomeCtrl", HomeCtrl);

export default homeModule;
