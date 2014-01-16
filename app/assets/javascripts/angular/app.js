'use strict';



$( window ).resize(function() {
	// // console.log("Document = " + $(document).height());
	// // console.log("Window   = " + $(window).height());
	// $('#sidebar').css('height', $(document).height() + "px");
	console.log(document.body.scrollHeight);

});

angular.module('journalApp', [
	'ngRoute',
	'journal.directives',
	'journal.services', 
	'journal.controllers',
	'journal.filters'
]).
config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', { templateUrl : 'partials/splash_page.html', controller: 'mainController'});
	$routeProvider.when('/public', { templateUrl : 'partials/public_page.html', controller : 'publicController'});
	$routeProvider.when('/add', {templateUrl : 'partials/add_journal_entry.html', controller : 'addEntryController'});
	$routeProvider.when('/poster/:user_id/entry/:entry_id', {templateUrl: 'partials/details_page.html', controller: 'detailsController' });
	$routeProvider.otherwise({redirectTo: '/'});
}]);