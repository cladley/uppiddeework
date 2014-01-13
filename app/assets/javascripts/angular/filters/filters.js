'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);


// This has to be change. I am hard coding the path to the img folder here
angular.module('journal.filters', []).
	filter('getCategoryIcon', function(){

		return function(category){
			switch(category.toLowerCase()){
				case "activity":
					return "img/running_white.png";
				break;
				case "productivity":
					return "img/develop_white.png";
				break;
				default:
					return "img/general_white.png";
			}
		}

	})
	.filter('colourTheme', function(){
		return function(category){
			switch(category.toLowerCase()){
				case "wellbeing": 
					return "blue";
				case "creativity": 
					return "pink";
				case "community":
					return "orange";
				case "productivity":
						return "green";
				default: 
					return "green";
			}
		}
		
	});