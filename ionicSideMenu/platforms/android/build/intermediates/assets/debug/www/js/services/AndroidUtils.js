angular.module('starter.androidUtilService', [])
.factory('AndroidUtils', function ($cordovaVibration, $cordovaLocalNotification) {

	return {
		//make device vibrate for 200 ms
		vibrate: function () {			
			navigator.vibrate(200);
			return;
		},
		//Add local notification when all list items are completed.
		schedleNotification: function (listTitle) {			
			var msg='Your '+listTitle+' marked as completed.';
			$cordovaLocalNotification.schedule({
				id: 1,
				title: 'To Do',
				text: msg,
				data: {
					customProperty: ''
				}
			}).then(function (result) {
				console.log(result);
			});
			return;
		}
	}
});