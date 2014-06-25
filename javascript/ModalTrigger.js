angular.module('modalApp').directive('modalTrigger', [
  'Modal',
  function (Modal) {
    return {
      restrict: 'A',
      scope: {
        modalTrigger: '@'
      },
      link: function ($scope, $element) {
        $element.addClass('modal-trigger');

        $scope.onTriggerClick = function () {
          Modal.getModalById($scope.modalTrigger).$scope.show();
        }
      
        if ($scope.modalTrigger) {
          // $scope.modal = Modal.getModalById($scope.modalTrigger);
          $element.on('click', $scope.onTriggerClick);
        }
      }
    }
  }
]);