var app = angular.module('starter.menuController', [])
app.controller('MenuController', function ($scope, LocalStorage, $ionicPopup) {

	//Check for local storage support
	if (!LocalStorage.isSupported()) {
		alert("Local Storage not supported");
		return;
	}

	$scope.menuList = LocalStorage.getMenuItems();
	
	 $scope.isDefault = function($index) {
        return this.menuList[$index].default;
    };

	$scope.addNewMenuItem = function () {
		this.showAlert();
	};
	
	// An alert dialog
	$scope.showAlert = function () {

		$scope.data = {};

		var popUp = $ionicPopup.show({
			template: '<input type="text" ng-model="data.menuItemText"/>',
			title: 'Add Menu Item',
			scope: $scope,
			buttons: [
				{
					text: 'Close',
				},
				{
					text: '<b>Add</b>',
					type: 'button-dark',
					onTap: function (e) {
						if (!$scope.data.menuItemText) {
							//don't allow the user to close untill he added something in input text
							e.preventDefault();
						} else {
							return $scope.data.menuItemText;
						}
					}
       			},
     			]});
		
		popUp.then(function (res) {
			if (!res) return;
			console.log(res);
			
			$scope.menuList = LocalStorage.addMenuItem(res);
		});
	}
});