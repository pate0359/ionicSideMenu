angular.module('starter.services1', [])

.factory('AndroidUtils', function ($cordovaVibration, $cordovaLocalNotification) {

	return {
		vibrate: function () {
			
			navigator.vibrate(1000);
			return;
		},
		schedleNotification: function () {
			$cordovaLocalNotification.schedule({
				id: 1,
				title: 'Title here',
				text: 'Text here',
				data: {
					customProperty: 'custom value'
				}
			}).then(function (result) {
			
				console.log(result);
			});
			return;
		}
	}
});