var animations = angular.module('journal.animations',[]);

animations.animation('.move-class', function(){
  return {
     //this is called AFTER the class is added
    addClass : function(element, className, done) {
      $(element).animate({
        top : '0px'
      }, done);

      return function onEnd(element, done) { };
    },
    removeClass : function(element, className, done){
      $(element).animate({
        top: '-340px'
      },done);

      return function onEnd(element, done){ };
    }
  };
});

