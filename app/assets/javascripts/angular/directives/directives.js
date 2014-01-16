'use strict';

/* Directives */

var myDirectives = angular.module('journal.directives', []);



//Unused directive - to remove
myDirectives.directive('fancyCheckbox', function(){
		return {
			restrict : 'EA', 
			replace : true,
			template : '<div class="fancyCheckbox">' +
						'<input ng-model="isChecked" type="checkbox" id="{{ checkId }}" name="{{ checkName }}" value="{{ checkValue }}" />' +
						'<label for="{{ checkId }}" ></label>' +
						'</div>',
			scope : {
				colour : '@',
				checkId : '@', 
				checkValue : '@', 
				checkName : '@',
				isChecked : '=',
				scale : '@'
			},
			link : function(scope, elem, attrs){

				function randomString(length, chars) {
    			var result = '';
   				for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    			return result;
				}

				// if(typeof scope.checkId === 'undefined' || scope.checkId === ''){
				// 	// create a random id for the checkbox
				// 		var randId = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
				// 		var checkbox = elem.find('input')[0];
				// 		checkbox.id = randId;
				// 		var label = elem.find('label')[0];
				// 		label.htmlFor = randId;
				// }

				var chkbox = elem.find('input')[0];

				
				if(typeof scope.scale !== 'undefined' || scope.scale !== ''){
					elem.css('-webkit-transform' , 'scale(' + scope.scale + ')');
					elem.css('-moz-transform' , 'scale(' + scope.scale + ')');
					elem.css('-ms-transform' , 'scale(' + scope.scale + ')');
					elem.css('transform' , 'scale(' + scope.scale + ')');
				}

				var spotColourClass;
				var valid_colours = ['blue', 'green', 'gray', 'purple', 
									'blue', 'orange', 'charcoal', 'light',
									'yellow', 'red', 'pink', 'turquoise'];

		
				if(valid_colours.indexOf(scope.colour) !== -1){					
					spotColourClass = scope.colour + "spot";
				}else{
					spotColourClass = 'greenspot';
				}

				elem.addClass(spotColourClass);
			}
		};
	});


// Directive to display journal information in card form
// Like twitter cards
myDirectives.directive('journalCard', function(){
		return {
			restrict : 'EA',
			replace : true,
			templateUrl : 'partials/journal_panel.html',
			scope : {
				type : '@', 
				click : '&',
				journalEntry : '='
			},
			link : function(scope,elem,attrs){
				
				function getRandomInt (min, max) {
    				return Math.floor(Math.random() * (max - min + 1)) + min;
				}
				
				if(!scope.journalEntry.pic){				
					var header = elem.find('header')[0];
					header.style.display = "none";
				}

				if(scope.journalEntry.category){
					var category = scope.journalEntry.category.toLowerCase();
					elem.addClass(category);
				}


				elem.bind('click', function(){
					console.log("CLicked");
					scope.click();
				});
			}
		};
	});

// Display short version of the journal entry
// Used on add, edit pages
myDirectives.directive('journalTab', function(){
		return {
			restrict : 'EA', 
			replace : true,
			templateUrl : 'partials/journal_tab.html',
			scope : {
				journalEntry : '='
			},
			link : function(scope,elem,attrs){
			
				if(scope.journalEntry.category){
					var category = scope.journalEntry.category.toLowerCase();
					elem.addClass(category);
				}

			}
		};
	});


// Checkbox and radiobutton which have a coloured spot
// to indicate if selected or not. The colour is linked to 
// colour of category
myDirectives.directive('fancyInput', function(){
		return {
			restrict : 'EA', 
			replace : true,
			template : '<div class="fancyInput">' +
						'<input ng-model="isChecked" type="{{ type }}" id="{{ checkId }}" name="{{ checkName }}" value="{{ checkValue }}" />' +
						'<label for="{{ checkId }}" ></label>' +
						'</div>',
			scope : {
				colour : '@',
				type : '@',
				checkId : '@', 
				checkValue : '@', 
				checkName : '@',
				isChecked : '=?',
				scale : '@'
			},
			link : function(scope, elem, attrs){
				function randomString(length, chars) {
    			var result = '';
   				for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    			return result;
				}

				// if(typeof scope.type !== 'undefined' || scope.type !== ''){
				// 	// default to a checkbox
				// 	var input = elem.find('input')[0];
				// 	angular.element(input).attr('type', 'checkbox');
				// 	console.log(input);
				// }
				
				if(typeof scope.scale !== 'undefined' || scope.scale !== ''){
					elem.css('-webkit-transform' , 'scale(' + scope.scale + ')');
					elem.css('-moz-transform' , 'scale(' + scope.scale + ')');
					elem.css('-ms-transform' , 'scale(' + scope.scale + ')');
					elem.css('transform' , 'scale(' + scope.scale + ')');
				}


				var spotColourClass;
				var valid_colours = ['blue', 'green', 'gray', 'purple', 
									'blue', 'orange', 'charcoal', 'light',
									'yellow', 'red', 'pink', 'turquoise'];

		
				if(valid_colours.indexOf(scope.colour) !== -1){					
					spotColourClass = scope.colour + "spot";
				}else{
					spotColourClass = 'greenspot';
				}

				elem.addClass(spotColourClass);
			}
		};
	});




myDirectives.directive('columnPanel', function($filter){
	return {
		restrict : 'EA', 
		transclude : true,
		scope: {
			cols : '@', 
			collection : '=',
			filterbyy : '='
		},
		template : '<div class="column-panel">' + 
									'<ul ng-repeat="col in columns">' +
										'<li ng-repeat="item in col" ng-transclude></li>' +
									'</ul>' +
								'</div>', 
		link : function(scope, elem,attrs){
			// Helper Function to split items in collection
			// into array representing number of columns
		
		  // TODO : If the number of items is less than
		  // how many columns I want, then it really fucks up
			function partition(size, items){
				var items_per = Math.floor(items.length / size);
				var result =  __partition(items_per, items);

				if(result.length > size){
					var num_remaining = result.length - size;
					var remaining = result.splice(result.length - num_remaining,num_remaining);
			
					var counter = 0;
					for(var i = 0; i < remaining.length; i++){

						var arr = remaining[i];
						for(var k = 0; k < arr.length; k++){
							result[counter++].push(arr[k]);
						}
					}
				}
				return result;
			}

			function __partition(size,items){
				if(items.length === 0) return [];
				return ([items.slice(0,size)]).concat(__partition(size, items.slice(size)));
			
			}	

			function partitionrows(){
					var temp = $filter('byCategory')(scope.collection,scope.filterbyy)
					scope.columns = partition(scope.cols,temp);
			}

			scope.cols =	scope.cols || 1;
			scope.$watch('collection', function(){
				if(scope.collection.length > 0){
					var temp = $filter('byCategory')(scope.collection,scope.filterbyy)
					scope.columns = partition(scope.cols,temp);
				}
			});


			scope.$watchCollection('filterbyy', function(){
				partitionrows();
			});
		
		}
	};
});



myDirectives.directive('selectFile', function(){
	return {
		restrict : "A", 
		scope : {
			'fileSelected': '&'
		},
		link : function(scope,elem,attr){
			elem.bind("change", function(e){
				var fileObj = (e.srcElement || e.target).files[0];
				
				scope.fileSelected({'fileObj': fileObj});
			});
		}
	};
});