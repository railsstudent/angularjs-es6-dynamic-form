function HomeConfig($stateProvider) {
  "ngInject";

  $stateProvider.state("home", {
    url: "",
    controller: "HomeController",
    controllerAs: "vm",
    template: require("./home.html")
  });
}
HomeConfig.$inject = ["$stateProvider"];

export default HomeConfig;
