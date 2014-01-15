'use strict';

/* Filters */

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
				case "community":
					return "img/support_white.png";
				break;
				case "wellbeing":
					return "img/walking_white.png";
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
				case "activity":
						return "red";
				default: 
					return "green";
			}
		}
	})
	.filter('byCategory', function(){
		return function(entries,categories){
			var out = [];

			for(var i = 0, max = entries.length; i < max; i++){
				if(categories[entries[i].category] == true){
					out.push(entries[i]);
				}
			}
			return out;
		};
	});