'use strict';

/* Services */

var myServices = angular.module('journal.services', []);

myServices.factory('mockJournalEntries',function($http){
		return {
			get : function(){
				return $http.get('/app/data.json');
			}
		};
	});


myServices.factory('assetsService', function(){
	return {
		path : function(type){
			switch(type){
				case "images":
					return 'img';
					break;
			}
		}
	};
});


myServices.factory('action_service', function(){
	var action;
	return {
		set_action : function(action_object){
			action = action_object;
		},
		get_action : function(){
			return action;
		}
	};
});

myServices.factory('journal_entries', function($http,$q){
		var cache = {
			all_entries : null,
			user_entries : null,
			user_entries_hash : null
		};


		function setup_entries_hash(data){
			cache.user_entries_hash = {};
			for(var i = 0, len = data.length; i < len; i++){
				cache.user_entries_hash[data[i].id] = data[i];
			}
		}

		return {
			getAll : function(){
				var deferred = $q.defer();

				if(cache.all_entries === null){
					$http.get('/entries')
						.success(function(data){
							cache.all_entries = data;
							deferred.resolve(data);
						})
						.error(function(error){
							deferred.reject(error);
						});
				}else{
					console.log("hitting the cache");
					deferred.resolve(cache.all_entries);
				}

				return deferred.promise;
			},
			getUsers : function(user_id){
				var deferred = $q.defer();
				var url = '/employee/' + user_id + '/entries';
				
				if(cache.user_entries === null){
					$http.get(url)
						.success(function(data){
							cache.user_entries = data; 
							setup_entries_hash(data);
							deferred.resolve(data);
						})
						.error(function(error){
							deferred.reject(error);
						});
				}else{
					deferred.resolve(cache.user_entries);
				}
			
				return deferred.promise;
			},
			// would need to be changed
			get_entry : function(id){
				var deferred = $q.defer();
				if(cache.user_entries === null){

				}else{
					var entry = cache.user_entries_hash[id];
					if(entry){
						deferred.resolve(entry);
					}else{
						deferred.reject("no entry with id: " + id  +" found.");
					}
				}

				return deferred.promise;
			},
			create : function(user_id, entry){

				var token = $( 'meta[name="csrf-token"]' ).attr( 'content' );
 
			  $.ajaxSetup( {
			    beforeSend: function ( xhr ) {
			      xhr.setRequestHeader( 'X-CSRF-Token', token );
			    }
			  });

				var url = '/employee/' + user_id + '/entries/create';
				return $.ajax({
					url : url,
					type: "POST",
					data : entry,
					processData: false,
					contentType : false
				});
				// return $http.post(url, entry);
			}
		};
	});

myServices.factory('UserLoggedIn', function(){
		return {
			getCurrentUserId : function(){
				return "5";
			}
		};
	});
	


// TODO : authorization - Get session cookie and save
//      : get current user with token - maybe user id from server
//      : user can only edit their own journal entries, so check
myServices.factory('auth', function(){
	var user_id = "1";
	var user;
	return{
		get_user_id : function(){
			return user_id;
		},
		is_users : function(item){
			// If a full record is passed it
			if(angular.isObject(item)){
				return user_id == item.employee_id;
			// If an entry id is passed in
			}else if(angular.isString(item)){
				return user_id === item;
			}else{
				return false;
			}
		}
	};
});


// myServices.factory('continual_record_fetcher', function($timeout,$q,journalEntries){
// 	var timer;
// 	var should_stop = true;
// 	var is_running = false;
// 	var error_count = 0;
// 	var successCallback;
// 	var errorCallback;

// 	function run(){
// 		console.log("fetching records from server");
// 		var prm = journalEntries.getAll();

// 		prm.then(
// 			function(data,status,headers,config){    // On Success
// 				successCallback(data);
// 				if(!should_stop) $timeout(run,3000);
// 			},
// 			function(data,status,headers,config){    // On Error. Idea = if get 3 or more errors, then cancel
// 				// Error received, retry and send again
// 				if(++error_count > 3){
// 					if(!should_stop) $timeout(run,3000);
// 				}else{
// 					// After so many errors and retrys, cancel operation
// 					errorCallback(data);
// 					_stop();
// 				}
// 			});
// 	}

// 	function _stop(){
// 		$timeout.cancel(timer);
// 		should_stop = true;
// 		is_running = false;
// 		error_count = 0;
// 		console.log("Stopped");
// 	}

// 	return {
// 		start : function(onSuccess,onError){
// 			successCallback = onSuccess || function(){};
// 			errorCallback = onError || function(){};

// 			if(!is_running){
// 				is_running = true;
// 				should_stop = false;
// 				error_count = 0;
// 				run();				
// 			}

// 		},
// 		stop : function(){
// 			_stop();
// 		}
// 	};
// });



