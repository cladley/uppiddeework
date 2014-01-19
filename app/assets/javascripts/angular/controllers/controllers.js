'use strict';


var myControllers = angular.module('journal.controllers', []);
	

// Master controller.
// One controller to rule the all
// Attached to body tag, so parent of every other controller
myControllers.controller('masterController', ['$scope', function($scope){

}]);


myControllers.controller('mainController', ['$scope', 'mockJournalEntries', function($scope, dummydata){
		$scope.title = "Main COTENT";
}]);


myControllers.controller('publicController', ['$scope', 'auth', 'journalEntries', 'continual_record_fetcher', function($scope,auth, journalEntries, continual_record_fetcher){
		// Todo : Load all entries on page load - check cache first.
		//      : start timer to check server for new entries (60 secs)
		//      : animate new entries in - flash or something
    
		$scope.loading = false;
		$scope.entries = [];
		$scope.get = function(){
			$scope.loading = true; 
			journalEntries.getAll()
				.success(function(data){
					$scope.loading = false;
					$scope.entries = data;
				})
				.error(function(error){
					$scope.loading = false;
					alert('An error occured in the publicController on the $http get');
				});
		};

		$scope.start_timer = function(){
			continual_record_fetcher.start();

		};

		$scope.stop_timer = function(){
			continual_record_fetcher.stop();
		};
			
		$scope.clickme = function(data){
			console.log(data);
		};

		$scope.is_my_entry = function(user_id){
			return auth.get_user_id == user_id;
		};


		$scope.$on('categoryfilter:changed', function(evt,data){
		
			$scope.cats = data.categories;

		});

		$scope.cats = {
			"wellbeing" : true,
			"creativity" : true,
			"community" : true,
			"productivity" : true,
			"activity" : true
		};

	}]);


myControllers.controller('sidebarController', ['$scope', '$rootScope', function($scope, $rootScope){


		$scope.selected_category = {
			"wellbeing" : true,
			"creativity" : true,
			"community" : true,
			"productivity" : true,
			"activity" : true
		};


		$scope.$watch('selected_category', function(){
			$rootScope.$broadcast('categoryfilter:changed', { categories : $scope.selected_category});
		},true);
	
	}]);


myControllers.controller('addEntryController', ['$scope','UserLoggedIn', '$http', 'journalEntries', '$location', 'user_entries_cache', function($scope,  UserLoggedIn, $http, journalEntries, $location, user_entries_cache){
		$scope.goBack = function(){};

		var userId = UserLoggedIn.getCurrentUserId();

		$scope.save = function(){
	
			if($scope.journalForm.$valid){
			
				journalEntries.create(userId, $scope.journalEntry)
					.success(function(data, status, headers){		
						
						$scope.journalForm.$setPristine();
						$scope.journalEntry = {};
						$scope.my_entries.push(data);
						user_entries_cache.add_entry(data);
					})
					.error(function(data, status, headers){
						// Create some logging service, which will sends error back to the server
						
						// For debugging only
						alert('error');
					});
			}
		};


		$scope.image_selected = function(data){

			var reader = new FileReader();
			reader.onload = function(e){
				
					$scope.$apply(function(){
						$scope.selected_image =  e.target.result;
					});
			};

			reader.readAsDataURL(data);
		};


		// Form related methods;
		$scope.canSave = function(){
			return $scope.journalForm.$dirty && $scope.journalForm.$valid;
		};

		$scope.getCssClasses = function(ngModelController){
			return {
				error : ngModelController.$invalid && ngModelController.$dirty,
				success : ngModelController.$valid && ngModelController.$dirty
			};
		};

		$scope.showError = function(ngModelController, error){
			return ngModelController.$error[error];
		};

		// Use the service to get all journal entries from the server
		// Only get ones that have been marked as published

		$scope.getEntries = function(){
			journalEntries.getUsers(userId)
				.success(function(data,status,headers){
					$scope.my_entries = data;
					user_entries_cache.set(data);
				})
				.error(function(data,status,headers){
					console.log('ererrerer');
				});
		};



		// When user click on a journal tab, then show details view
		// with the corresponding entry open
		$scope.show_detail = function(entry_id){
			var url = '/poster/' + userId + '/entry/' + entry_id;
			$location.path(url);
		}


		// Run when controller is created.
		// We check to see if our entries are already
		// in the cache, so load them, else fetch our 
		// journal entries from the server, and save in cache
		function init(){
			if(!user_entries_cache.are_records()){
				$scope.getEntries();
			}else{
				$scope.my_entries = user_entries_cache.get();
			}
		}

		init();
	}]);



myControllers.controller('detailsController', ['$scope', '$routeParams', 'UserLoggedIn', '$location', function($scope,$routeParams, UserLoggedIn, $location){
		
		if($routeParams.user_id !== UserLoggedIn.getCurrentUserId()){
			$location.path('/public')
		}

}]);


myControllers.controller('testController', ['$scope', function($scope){

	$scope.title = "here";


	$scope.entry = {
		'id' : '435', 
		'poster_id' : '123', 
		'type' : 'log',
		'category' : 'wellbeing',
		'description' : 'ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, tenetur, et, in, sapiente ratione amet reiciendis a enim excepturi amet.',
		'posted' : '2014-01-11 19:43:26', 
		'updated' : '2014-01-11 23:12:30', 
		'extra' : '660 calories'
	};



	$scope.photo_entry = {
		'id' : '235', 
		'poster_id' : '324', 
		'type' : 'photo',
		'category' : 'community',
		'description' : 'ipsum dolor sit amet. In, sapiente ratione amet reiciendis a enim excepturi amet.',
		'image' : 'running.jpg',
		'posted' : '2014-01-11 19:43:26', 
		'updated' : '2014-01-11 23:12:30', 
		'extra' : '620 calories'
	};


	$scope.goal_entry = {
		'id' : '341', 
		'poster_id' : '324', 
		'type' : 'goal',
		'category' : 'feedback',
		'description' : 'In, sapiente ratione amm excepturi amet.',
		'posted' : '2014-01-11 19:43:26', 
		'updated' : '2014-01-11 23:12:30', 
		'extra' : 'A++'
	};




}]);

