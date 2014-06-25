angular.module('modalApp').service('TransitionNames', function () {
  var transitionEndEventNames = {
    'WebkitTransition' : 'webkitTransitionEnd',
    'OTransition' : 'oTransitionEnd',
    'msTransition' : 'MSTransitionEnd',
    'transition' : 'transitionend'
  };

  var animationEndEventNames = {
    'WebkitAnimation' : 'webkitAnimationEnd',
    'OAnimation' : 'oAnimationEnd',
    'msAnimation' : 'MSAnimationEnd',
    'animation' : 'animationend'
  };

  return {
    transitionEnd: transitionEndEventNames[Modernizr.prefixed('transition')],
    animationEnd: animationEndEventNames[Modernizr.prefixed('animation')]
  };
});
