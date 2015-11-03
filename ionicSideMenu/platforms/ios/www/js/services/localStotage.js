angular.module('starter.services', [])

.factory('LocalStorage', function (localStorageService) {

	return {
		isSupported: function () {
			var isSupported;
			localStorageService.isSupported ? isSupported = true : isSupported = false;

			return isSupported;
		},
		getItems: function (listId) {

			var list = localStorageService.get("listItem" + listId);
			if (!list) list = [];

			return list;
		},
		addItem: function (listId, itemTitle) {

			var listItems = this.getItems(listId);

			var item = {};
			item.title = itemTitle;
			item.done = false;
			listItems.push(item);

			//update local storage
			localStorageService.set("listItem" + listId, listItems);

			return listItems;
		},
		removeItem: function (listId, $index) {
			var listItems = this.getItems(listId);

			listItems.splice($index, 1);
			//update local storage
			localStorageService.set("listItem" + listId, listItems);

			return listItems;
		},
		markItemDone: function (listId, $index) {

			var listItems = this.getItems(listId);
			var item = listItems[$index];
			item.done = !item.done;

			//update local storage
			localStorageService.set("listItem" + listId, listItems);
			return listItems;
		},
		updateSettings: function (varSetting) {
			var setting = {};
			setting.isVibrate = varSetting.isVibrate;
			setting.isNotify = varSetting.isNotify;
			//update settings
			localStorageService.set("sttings", setting);

			return;
		},
		getSettings: function () {
			//get setting 
			var setting = localStorageService.get("sttings");

			if (!setting) {
				var setting = {};
				setting.isVibrate = true;
				setting.isNotify = true;
			}
			return setting;
		}
	}
});