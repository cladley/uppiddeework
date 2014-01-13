'use strict';

/* Directives */

angular.module('journal.directives', []).
	directive('fancyCheckbox', function(){
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
	})
	.directive('journalCard', function(){
		return {
			restrict : 'EA',
			replace : true,
			templateUrl : 'partials/journal_panel.html',
			scope : {
				type : '@', 
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
			}
		};
	})
	.directive('journalTab', function(){
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
	})
	.directive('fancyRadiobutton', function(){
			return {
			restrict : 'EA', 
			replace : true,
			template : '<div class="fancyCheckbox">' +
						'<input ng-model="isChecked" type="radio" id="{{ checkId }}" name="{{ checkName }}" value="{{ checkValue }}" />' +
						'<label for="{{ checkId }}" ></label>' +
						'</div>',
			scope : {
				colour : '@',
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


	})
	.directive('fancyInput', function(){
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



