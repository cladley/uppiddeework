'use strict';


angular.module('journal.controllers', []).
	controller('mainController', ['$scope', 'mockJournalEntries', function($scope, dummydata){
		$scope.title = "Main COTENT";
	}])
	.controller('publicController', ['$scope', 'journalEntries', function($scope, journalEntries){

		$scope.loading = false;
		$scope.title = "Public View";
		
		$scope.get = function(){
			$scope.loading = true; 
			journalEntries.getAll().success(function(data){
				$scope.loading = false;
				$scope.entries = data;
			})
			.error(function(error){
				$scope.loading = false;
				alert('An error occured in the publicController on the $http get');
			});
		};

	}])
	.controller('sidebarController', ['$scope', function($scope){

		$scope.categories = [
			{
				name : 'wellbeing', 
				checked : true,
			
			},
			{
				name : 'creativity', 
				checked : true,
				
			},
			{
				name : 'community', 
				checked : true,
			
			},
			{
				name : 'productivity', 
				checked : true, 
		
			}
		];
	
	}])
	.controller('addEntryController', ['$scope','UserLoggedIn', '$http', 'journalEntries', '$location', 'user_entries_cache', function($scope,  UserLoggedIn, $http, journalEntries, $location, user_entries_cache){
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
					alert('error');
				});

			}
		};


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


		$scope.show_detail = function(entry_id){
			var url = '/poster/' + userId + '/entry/' + entry_id;
			$location.path(url);
		}


		function init(){
			if(!user_entries_cache.are_records()){
				$scope.getEntries();
			}else{
				$scope.my_entries = user_entries_cache.get();
			}
		}


		init();









	}])
	.controller('testController', ['$scope', function($scope){
			$scope.title = "Test Page";


			$scope.flag = false;

			$scope.changeflag = function(){
				$scope.flag = !$scope.flag;
			};

			$scope.$watch('flag', function(newVal,oldVal){
			//	console.log("Changed");
				console.log("Been changed");
			});
	}])
	.controller('detailsController', ['$scope', '$routeParams', 'UserLoggedIn', '$location', function($scope,$routeParams, UserLoggedIn, $location){
		
		if($routeParams.user_id !== UserLoggedIn.getCurrentUserId()){
			$location.path('/public')
		}




	}]);