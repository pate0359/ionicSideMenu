var app = angular.module('starter.controllers1', [])

app.controller('SettingController', function ($scope,LocalStorage) {
	
	$scope.setting=LocalStorage.getSettings();
	
	$scope.settingsChanged = function() {
		LocalStorage.updateSettings($scope.setting);
  	};	
});