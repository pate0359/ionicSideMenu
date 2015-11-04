var app = angular.module('starter.listController', [])
app.controller('ListController', function ($scope, $stateParams,LocalStorage,AndroidUtils) {
	
	//Enable Swipe on list item
	 $scope.listCanSwipe = true;

	//Get application settings from local storage
	$scope.setting=LocalStorage.getSettings();

	var id = $stateParams.listId;
	
	//Get List Title
	$scope.listTitle = LocalStorage.getListTitle(id);
	
	//Get List Items
	$scope.listItems =  LocalStorage.getItems(id);
	
	$scope.addItem = function () {
		if(!this.newItem || this.newItem == "") return;
		
		$scope.listItems = LocalStorage.addItem(id,this.newItem);
		this.newItem="";
	}

	$scope.removeItem = function ($index) {
		$scope.listItems=LocalStorage.removeItem(id, $index);
		
		//Schedule notification if list is completed after deleting the last not completed item
		var isCompleted = this.checkForCompletedList();
		if(isCompleted && $scope.setting.isNotify){
			AndroidUtils.schedleNotification($scope.listTitle);
		}
	}

	//mark item as DONE
	$scope.markDone = function ($index) {
		$scope.listItems=LocalStorage.markItemDone(id, $index);
		
		//Vibrate device
		var item = $scope.listItems[$index];
		
		if(item.done && $scope.setting.isVibrate){
			AndroidUtils.vibrate();
		}
		
		//Schedule notification if list completed
		var isCompleted = this.checkForCompletedList();
		if(isCompleted && $scope.setting.isNotify){
			AndroidUtils.schedleNotification($scope.listTitle);
		}
	}
	//Check if all list items are checked.
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