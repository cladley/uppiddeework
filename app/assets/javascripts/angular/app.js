'use strict';

angular.module('journalApp', [
	'ngAnimate',
	'ngRoute',
	'journal.directives',
	'journal.services', 
	'journal.controllers',
	'journal.filters'
	// 'journal.animations'
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
		  controller : 'entries_controller'
	});

	$routeProvider.when('/user/:user_id/edit/:id', 
	{
		templateUrl : 'partials/add_journal_entry.html', 
		controller : 'entries_controller'
	});
	
	$routeProvider.when('/poster/:user_id/entry/:entry_id', 
	{ 
			templateUrl: 'partials/details_page.html', 
		  controller: 'detailsController' 
	});



	$routeProvider.otherwise({redirectTo: '/'});
}]);