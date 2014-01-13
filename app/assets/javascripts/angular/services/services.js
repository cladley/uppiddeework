'use strict';

/* Services */

angular.module('journal.services', [])
	.factory('mockJournalEntries',function($http){
		return {
			get : function(){
				return $http.get('/app/data.json');
			}
		};
	})
	.factory('journalEntries', function($http,$q){
		return{
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

	})
	.factory('UserLoggedIn', function(){
		return {
			getCurrentUserId : function(){
				return "1";
			}
		}
	})
	.factory('user_entries_cache', function(){
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




	function partition(size, items){
		var items_per = Math.floor(items.length / size);
		
		var result =  __p(items_per, items);
		debugger;
		if(result.length > size){
			var num_remaining = result.length - size;
			var remaining = result.splice(result.length - num_remaining,num_remaining);
			for(var i = 0; i < remaining.length; i++){
				result[i].push(remaining[i]);
			}
		}

		return result;
	}


	function __p(size,items){
		if(items.length === 0) return [];

		return ([items.slice(0,size)]).concat(__p(size, items.slice(size)));
	}



