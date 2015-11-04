var app = angular.module('starter.settingController', [])
app.controller('SettingController', function ($scope,LocalStorage) {
	//Get settings from local storage
	$scope.setting=LocalStorage.getSettings();
	
	//update setting
	$scope.settingsChanged = function() {
		LocalStorage.updateSettings($scope.setting);
  	};	
});