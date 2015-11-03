var app = angular.module('starter.controllers', [])

app.controller('ListController', function ($scope, $stateParams,LocalStorage,AndroidUtils) {
	
	//Enable Swipe on list item
	 $scope.listCanSwipe = true;

	//Check for local storage support
	if (!LocalStorage.isSupported) {

		alert("Local Storage not supported");
		return;
	}
	
	//Get application settings from local storage
	$scope.setting=LocalStorage.getSettings();

	var id = $stateParams.listId;
	if(id==1)
	{
		$scope.listTitle = "Shopping List";
	}else if(id==2)
	{
		$scope.listTitle = "Clipboards";
	}else if(id==3)
	{
		$scope.listTitle = "Events";
	}

	$scope.listItems =  LocalStorage.getItems(id);
	
	$scope.addItem = function () {
		$scope.listItems = LocalStorage.addItem(id,this.newItem);
		this.newItem="";
	}

	$scope.removeItem = function ($index) {
		
		$scope.listItems=LocalStorage.removeItem(id, $index);
	}

	$scope.markDone = function ($index) {
		
		$scope.listItems=LocalStorage.markItemDone(id, $index);
		
		//Vibrate device
		var item = $scope.listItems[$index];
		console.log($scope.setting);
		
		if(item.done && $scope.setting.isVibrate){
			AndroidUtils.vibrate();
		}
		
		//Schedule notification if list completed
		var isCompleted = this.checkForCompletedList();
		if(isCompleted && $scope.setting.isNotify){
			AndroidUtils.schedleNotification();
		}
	}
	
	$scope.checkForCompletedList = function () {
		
		var isCompleted=true;
		angular.forEach($scope.listItems, function(item) {
			if(isCompleted){
				if(!item.done) isCompleted=false;
			}
		});
		return isCompleted;
	};
});