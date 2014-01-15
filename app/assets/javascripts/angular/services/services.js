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


myServices.factory('journalEntries', function($http,$q){
		return {
			getAll : function(){
				return $http.get('/entries');
			},
			getUsers : function(user_id){
				var url = '/employee/' + user_id + '/entries';
				return $http.get(url);
			},
			create : function(user_id, entry){
				var url = '/employee/' + user_id + '/entries/create';
				return $http.post(url, entry);
			}
		};
	});


myServices.factory('UserLoggedIn', function(){
		return {
			getCurrentUserId : function(){
				return "1";
			}
		};
	});
	

myServices.factory('user_entries_cache', function(){
		var user_entries = {};
		var init = false;

		return {
			get : function(){
				return user_entries;
			},
			set : function(entries){
				user_entries = entries;
				init = true;
			},
			add_entry : function(entry){
				user_entries.push(entry);
				init = true;
			},
			remove_entry : function(entry){

			},
			get_entry : function(id){

			},
			update_entry : function(entry){

			},
			are_records : function(){
				return init;
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
		}

	};

});



myServices.factory('continual_record_fetcher', function($timeout,$q,journalEntries){
	var timer;
	var should_stop = true;
	var is_running = false;
	var error_count = 0;
	var successCallback;
	var errorCallback;

	function run(){
		console.log("fetching records from server");
		var prm = journalEntries.getAll();

		prm.then(
			function(data,status,headers,config){    // On Success
				successCallback(data);
				if(!should_stop) $timeout(run,3000);
			},
			function(data,status,headers,config){    // On Error. Idea = if get 3 or more errors, then cancel
				// Error received, retry and send again
				if(++error_count > 3){
					if(!should_stop) $timeout(run,3000);
				}else{
					// After so many errors and retrys, cancel operation
					errorCallback(data);
					_stop();
				}
			});
	}

	function _stop(){
		$timeout.cancel(timer);
		should_stop = true;
		is_running = false;
		error_count = 0;
		console.log("Stopped");
	}

	return {
		start : function(onSuccess,onError){
			successCallback = onSuccess || function(){};
			errorCallback = onError || function(){};

			if(!is_running){
				is_running = true;
				should_stop = false;
				error_count = 0;
				run();				
			}

		},
		stop : function(){
			_stop();
		}
	};
});




// Cache service for user entries 
myServices.factory('cache', function(){
	// The user entries will always be up to date,
	// since only the user can create/edit etc. When one
	// of those operation happens, then we update 
	// user_entries here
	var user_entries = {};
	var invalid = true;

	return {
		get_user_entries : function(){

		},
		set_user_entries : function(){

		},
		add_user_entry : function(entry){
			user_entries.push(entry);
		}, 
		get_user_entry : function(entry_id){

		},
		update_user_entry : function(entry_id, entry){

		},
		remove_user_entry: function(entry_id){

		},
		get_public_entries : function(){

		},
		invalidate_public_entries : function(){
			invalid = true;
		},
		set_public_entries : function(entries){

		}
	};
});