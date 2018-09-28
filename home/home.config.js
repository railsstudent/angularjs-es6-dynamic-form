function HomeConfig($stateProvider) {
  "ngInject";

  $stateProvider.state("home", {
    url: "",
    controller: "HomeController",
    controllerAs: "vm",
    templateUrl: require("home/home.html")
  });
}
HomeConfig.$inject = ["$stateProvider"];

export default HomeConfig;
