angular.module('modalApp').controller('viewCtrl', [
  '$scope',
  function ($scope) {
    $scope.scopedModel = {
      name: 'Defined in ViewCtrl',
      date: new Date()
    }
  }
]);