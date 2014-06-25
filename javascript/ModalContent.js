angular.module('modalApp').directive('modalContent', [
  'Modal',
  'TransitionNames',
  function (Modal, TransitionNames) {
    return {
      restrict: 'AE',
      replace: true,
      transclude: true,
      scope: {
        modalId: '@',
        autoHide: '='
      },
      template: 
        '<div class="scrim" ng-click="onScrimClick($event)">'+
          '<div class="scrim-overlay"></div>'+
          '<div class="scrim-outer">'+
            '<div class="scrim-inner">'+
              '<div class="modal-container">'+
                '<div class="modal-content" ng-transclude></div>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>',
      compile: function () {
        return {
          // pre called before the $scope is linked to the $element
          pre: function ($scope, $element) {
            // clone element and transcluded contents
            var clone = $element.clone();
            // removes element from controller template's DOM
            $element.replaceWith(clone);
            // append scrim to bottom of body
            angular.element(document.getElementsByTagName('body')).append($element);    

            // adds support for use as an attribute value or use modal-id when directive is element
            $scope.modalKey = $element.attr('modal-content') || $element.attr('modal-id');

            // register modal with modal service for modal-trigger to access
            Modal.registerModal({
              id: $scope.modalKey,
              $scope: $scope
            });
          },
          // post used like a regular link function
          post: function ($scope, $element) {
            $scope.animate = $scope.animate || 'from-top';

            $scope.elementIsScrim = function (element) {
              // check if element has 'scrim' in it's class, there may be a better way
              return angular.element(element).attr('class').search('scrim') > -1;
            }

            $scope.onScrimClick = function (event) {
              if ($scope.elementIsScrim(event.target)) {
                $scope.hide();
              }
            }

            $scope.show = function () {
              $scope.notify('modal:show');
              $scope.addAnimationClasses();
              // class adds display: block to scrim class
              $element.addClass('show');
              window.setTimeout(function () {
                // class sets animation values
                $element.addClass('in');
              }, 50);
            }

            $scope.addAnimationClasses = function () {
              if ($scope.animate) {
                $element.addClass([$scope.animate, 'animate'].join(' '));
              }
            }

            $scope.hide = function () {
              $scope.notify('modal_hide:start');
              $element.removeClass('in');
              if ($scope.animate) {
                if (TransitionNames.transitionEnd) {
                  $element.on(TransitionNames.transitionEnd, (function () {
                    $element.removeClass('show');
                    $scope.notify('modal_hide:complete');
                    $element.off(TransitionNames.transitionEnd);
                  }).bind(this));
                  return;
                }
              } else {
                $element.removeClass('show');
                $scope.notify('modal_hide:complete');
              }
            }

            $scope.notify = function (eventString) {
              // emit goes up the chain to scope parents
              $scope.$emit(eventString, {
                id: $scope.modalKey,
                $scope: $scope,
                $element: $element
              });
            }

            $scope.removeModal = function () {
              // unregister inactive modal in service
              Modal.unregisterModalById($scope.modalKey);
              $scope.$destroy();
              $element.remove();
            }
            // listen for the parent $scope $destroy to destroy self
            $scope.$parent.$on('$destroy', $scope.removeModal);
          }

        }
      }
    }
  }
]);