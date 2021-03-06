'use strict';


var myControllers = angular.module('journal.controllers', []);
	
// Master controller.
// One controller to rule the all
// Attached to body tag, so parent of every other controller
myControllers.controller('masterController', ['$scope', function($scope){
}]);

myControllers.controller('mainController', ['$scope', 'mockJournalEntries', function($scope, dummydata){
}]);


myControllers.controller('publicController', 
	['$scope', 'auth', 'journal_entries',
	function($scope,auth, journal_entries){
		// Todo : Load all entries on page load - check cache first.
		//      : start timer to check server for new entries (60 secs)
		//      : animate new entries in - flash or something
		$scope.entries = [];
		$scope.loading = false;

		function init(){
			get_data();
		}

		function get_data(){
			$scope.loading = true;

			journal_entries.getAll().then(
			function(data){
				$scope.loading = false;
				$scope.entries = data;
			},function(error){
				$scope.loading = false;
				alert('An error occured in the publicController on the $http get');
			});

		}


		$scope.start_timer = function(){
			
		};

		$scope.stop_timer = function(){
			
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
		init();
	}]);


myControllers.controller('sidebarController', ['$scope', '$rootScope', function($scope, $rootScope){
		$scope.selected_category = {
			"wellbeing" : false,
			"creativity" : false,
			"community" : false,
			"productivity" : false,
			"activity" : false
		};

		$scope.add_new = function(){
			$rootScope.$broadcast('journal:addnew', {  });
		};

		$scope.$watch('selected_category', function(){
			$rootScope.$broadcast('categoryfilter:changed', { categories : $scope.selected_category});
		},true);	
}]);






// Used for add/edit/delete of users own entries
myControllers.controller('entries_controller',
 ['$scope', '$http', '$location','$routeParams', 
	'auth','journal_entries' ,'action_service' ,
	function($scope, $http, $location,$routeParams,auth,journal_entries,action_service,cache){

		// private member variables
		var form_data;
		var user_id;

		// $scope memeber variables
		$scope.showForm = true;
		$scope.myCssVar = "";

		init();
		// add, edit delete for entries
		var action = action_service.get_action();
	
		if(action === 'edit'){
			debugger;
			if($routeParams.id){
				var user_id = $routeParams.user_id;
				var entry_id = $routeParams.id;
		
				if(auth.is_users(entry_id)){
					debugger;
					journal_entries.get_entry(entry_id).then(function(data){
						debugger;
						alert("Yes the entry is here " + data);
					}, function(error){
						debugger;
						alert("Some fucking error occured trying to get an entry with id");
					});

					
				}else{
					// redirect to some page
					// display a flash messages saying that the user doesnt 
					// have permission to edit it
				}
		}
	}else if(action === 'delete'){

	}else if(action === 'view'){

	}else if(action === 'add'){
		//get_entries();
	}else{
		get_entries();
	}


	function init(){
		if(FormData) form_data = new FormData();
		user_id = auth.get_user_id();
		
	}

	function get_entries(){
		journal_entries.getUsers(user_id).then(function(data){
			$scope.my_entries = data;

		},function(error){
			console.log("Errroror");
		});
		
	}

  ////////////////////////////////////////////////////////////////
	// Form related methods;
	//////////////////////////

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

	$scope.changeClass = function(){
		$scope.myCssVar = $scope.myCssVar ? "" : "move-class";
	};

	$scope.image_selected = function(data){
		var reader = new FileReader();
		reader.onload = function(e){
				$scope.$apply(function(){
					$scope.selected_image =  e.target.result;
				});
		};

		reader.readAsDataURL(data);
		form_data.append("images[]", data);
	};


	$scope.save = function(){
	
			if($scope.journalForm.$valid){
			
				form_data.append('description', $scope.journalEntry.description);
				form_data.append('tags', $scope.journalEntry.tags);
				form_data.append('category', $scope.journalEntry.category);

				journal_entries.create(user_id, form_data)
					.success(function(data, status, headers){		
						// debugger;
						// Clear the form and journalEntry Object
						$scope.$apply(function(){
							$scope.journalForm.$setPristine();
							$scope.journalEntry = {};
							$scope.my_entries.push(data);
						});

						// user_entries_cache.add_entry(data);
					})
					.error(function(data, status, headers){
						// Create some logging service, which will sends error back to the server
						alert('error');
					});
			}
		};

	///////////////////////////
	// End Form related methods;
	//////////////////////////////////////////////////////////////////


	// When user click on a journal tab, then show details view
	// with the corresponding entry open
	$scope.show_detail = function(entry_id){
		var url = '/poster/' + user_id + '/entry/' + entry_id;
		$location.path(url);
	}

	$scope.$on('journal:addnew', function(evt,data){
			$scope.changeClass();
	});


	init();

}]);


myControllers.controller('add_entry_controller', 
	['$scope','UserLoggedIn', '$http', 'journalEntries', '$location',
	 function($scope,  UserLoggedIn, $http, journalEntries, $location){
		
		$scope.showForm = true;
		$scope.myCssVar = "";
		var formdata = new FormData();
		var userId = UserLoggedIn.getCurrentUserId();


		$scope.changeClass = function(){
			$scope.myCssVar = $scope.myCssVar ? "" : "move-class";
		};


		$scope.save = function(){
	
			if($scope.journalForm.$valid){
			
				formdata.append('description', $scope.journalEntry.description);
				formdata.append('tags', $scope.journalEntry.tags);
				formdata.append('category', $scope.journalEntry.category);

				journalEntries.create(userId, formdata)
					.success(function(data, status, headers){		
						// debugger;
						// Clear the form and journalEntry Object
						$scope.$apply(function(){
							$scope.journalForm.$setPristine();
							$scope.journalEntry = {};
							$scope.my_entries.push(data);
						});

					
					})
					.error(function(data, status, headers){
						// Create some logging service, which will sends error back to the server
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
			formdata.append("images[]", data);
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


		$scope.$on('journal:addnew', function(evt,data){
			$scope.changeClass();
		});

		// Run when controller is created.
		// We check to see if our entries are already
		// in the cache, so load them, else fetch our 
		// journal entries from the server, and save in cache
		function init(){
				$scope.getEntries();	
		}

		init();
	}]);



myControllers.controller('detailsController', 
	['$scope', '$routeParams', 'UserLoggedIn', '$location', 
	function($scope,$routeParams, UserLoggedIn, $location){
		
		if($routeParams.user_id !== UserLoggedIn.getCurrentUserId()){
			$location.path('/public')
		}

}]);


