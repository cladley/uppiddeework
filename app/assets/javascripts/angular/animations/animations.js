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



// animations.animation('.add-items', function(){
//   return{
//     enter : function(element,done){
//       element.css('opacity', 0);

//       $(element).animate({
//         opacity : 1;
//       },done);

//       // optional onDone or onCancel callback
//       // function to handle any post-animation
//       // cleanup operations
//       return function(isCancelled) {
//         if(isCancelled) {
//           $(element).stop();
//         }
//       }
//     }
//   };
// });