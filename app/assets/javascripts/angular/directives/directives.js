'use strict';

/* Directives */

var myDirectives = angular.module('journal.directives', []);


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
					//console.log("CLicked");
					scope.click();
				});
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


// column-panel
// Creates a N column layout using ul tags
// User selects the number of columns through the 'cols' attribute
myDirectives.directive('journalWallPanel', function($filter){
	return {
		restrict : 'EA', 
		transclude : true,
		scope: {
			cols : '@', 
			collection : '=',
			filter : '=', 
			itemClicked : '&'
		},
		template : '<div class="journal-wall-panel">' + 
									'<ul ng-repeat="col in columns">' +
										'<li ng-repeat="item in col" edit-panel="{{ item }}" my-journal-transclude="{{ item.category }}"  ng-class="{yo_boy:is_in_category(item)}"></li>' +
									'</ul>' +
								'</div>', 
		controller : function($scope){
			this.children = [];

			this.add_child = function(child){
				this.children.push(child);
			};

			this.child_clicked = function(obj){
				$scope.itemClicked({item : obj});
			}

		},
		link : function(scope, elem,attrs){

			scope.is_in_category = function(item){
				if(scope.filter[item.category]){
					return false;
				}else{
					return true;
				}
			}

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

			// function partitionrows(){
			// 		var temp = $filter('byCategory')(scope.collection,scope.filter)
			// 		scope.columns = partition(scope.cols,temp);
			// }

			scope.cols =	scope.cols || 1;
			scope.$watch('collection', function(){
				if(scope.collection.length > 0){

					var temp = $filter('byCategory')(scope.collection,scope.filter)
					scope.columns = partition(scope.cols,temp);
				}
			});
		}
	};
});


myDirectives.directive('editPanel',['auth','$location', function(auth,$location){
	return {
		restrict : 'A',
		link : function(scope,elem,attrs){

			var item = attrs.editPanel;


			if(item){
				item = angular.fromJson(item);
				if(auth.is_users(item)){
					var rawstr = '<div class="floating-edit-panel"><a>edit</a></div>';
					var new_element = angular.element(rawstr);
					// debugger;
					var a_tag = new_element.find('a').eq(0);


					a_tag.bind('click', function(e){
			
						 e.stopPropagation();
						var url = '/' + item.id + '/edit';
					
						scope.$apply(function(){
							$location.path(url);
						})	

					});


					elem.append(new_element);


				}




			}
		}
	};
}]);















myDirectives.directive('myJournalTransclude', function(){
	return {
		require: "^journalWallPanel", 
		link : function(scope,elem,attr,ctrl,$transclude){
	
			$transclude(function(clone){
				elem.empty();
				elem.append(clone);
	
				var obj = {
					elem : elem,
					item : attr.myTransclude
				};

				elem.on('click', function(e){
					ctrl.child_clicked(attr.myTransclude);
				});

				ctrl.add_child(elem);
			});

		}
	};

});















// select-file 
// Attach to input[type=file]
// Calls 'fileSelected' with file object selected by user
myDirectives.directive('selectFile', function(){
	return {
		restrict : "A", 
		scope : {
			'fileSelected': '&'
		},
		link : function(scope,elem,attr){
			// elem will be an element of type input[type=file]
			elem.bind("change", function(e){
				var fileObj = (e.srcElement || e.target).files[0];
				scope.fileSelected({'fileObj': fileObj});
			});
		}
	};
});



























myDirectives.directive('logCard', function(assetsService){
	return {
		restrict : 'EA', 
		replace: true,
		templateUrl : 'partials/cards/logcard.html', 
		scope : {
			'entry' : '=?',
			'type' : '@', 
			'click' : '&'
		},
		link : function(scope,elem,attr){
			
			scope.path = assetsService.path('images');
			if(typeof scope.entry === 'undefined' || scope.entry === ''){
				// Create some default data to be injected into the template
				scope.entry = {
					'id' : '999', 
					'poster_id' : '123', 
					'category' : 'activity', 
					'description' : 'Yooooo ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, tenetur, et, in, sapiente ratione amet reiciendis a enim excepturi amet.',
					'posted' : 	'2014-01-11 19:43:26', 
					'updated' : '2014-01-11 23:12:30', 
					'extra' : '660 calories'
				};
			}

			if(typeof scope.entry.card_type === 'undefined' || scope.entry.card_type === ''){
				scope.entry.card_type = 'standard';
			}

			elem.bind('click', function(e){
				scope.click({ "entry" : scope.entry });
			});

		}// end of link
	};
});