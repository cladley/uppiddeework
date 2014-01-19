'use strict';


angular.module('journalApp', [
	'ngRoute',
	'journal.directives',
	'journal.services', 
	'journal.controllers',
	'journal.filters' 
]).
config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', 
	{
		 templateUrl : 'partials/splash_page.html', 
		 controller: 'mainController'
	});
	
	$routeProvider.when('/public', 
	{ 
		 templateUrl : 'partials/public_page.html', 
		 controller : 'publicController'
	});
	
	$routeProvider.when('/add', 
	{ 
			templateUrl : 'partials/add_journal_entry.html', 
		  controller : 'addEntryController'
	});
	
	$routeProvider.when('/poster/:user_id/entry/:entry_id', 
	{ 
			templateUrl: 'partials/details_page.html', 
		  controller: 'detailsController' 
	});

	$routeProvider.when('/testpage',
	{
			templateUrl : 'partials/testpage.html', 
			controller : 'testController'
	});

	$routeProvider.otherwise({redirectTo: '/'});
}]);