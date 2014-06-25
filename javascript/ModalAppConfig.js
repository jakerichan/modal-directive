var modalApp = angular.module('modalApp', ['ngRoute']);
 
// wanted to use a template to show the modals can be placed anywhere
modalApp.config(function ($routeProvider) {
  $routeProvider.when('/view', {
    templateUrl: 'templates/ViewCtrlTemplate.html',
    controller: 'viewCtrl'
  }).otherwise({
    redirectTo: '/view'
  });
});