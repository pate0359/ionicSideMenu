angular.module('starter.localStorageService', [])
.constant('localStorageKey', 'IONIC-SIDE-MENU-PATE0359')

.factory('LocalStorage', function (localStorageService,localStorageKey) {
	return {
		isSupported: function () {
			
			var isSupported;
			localStorageService.isSupported ? isSupported = true : isSupported = false;

			//initialize default local storage schema
			if(isSupported) this.initializeDefaultLocalStorageSchema();
			
			return isSupported;
		},
		getItems: function (listId) {

			var storage = localStorageService.get(localStorageKey);
			var list=storage.menuList[listId-1].listItems;
			return list;
		},
		updateLocalStorage:function(listId, listItems){
			
			var storage = localStorageService.get(localStorageKey);
			storage.menuList[listId-1].listItems=listItems;
			//update local storage
			localStorageService.set(localStorageKey, storage);
			
		},
		getListTitle: function (listId) {

			var storage = localStorageService.get(localStorageKey);
			var title=storage.menuList[listId-1].title;
			return title;
		},
		addItem: function (listId, itemTitle) {

			var listItems = this.getItems(listId);

			var item = {};
			item.title = itemTitle;
			item.done = false;
			listItems.push(item);

			//update local storage
			this.updateLocalStorage(listId, listItems);

			return listItems;
		},
		removeItem: function (listId, $index) {
			
			var listItems = this.getItems(listId);

			listItems.splice($index, 1);
			//update local storage
			this.updateLocalStorage(listId, listItems);

			return listItems;
		},
		markItemDone: function (listId, $index) {

			var listItems = this.getItems(listId);
			var item = listItems[$index];
			item.done = !item.done;

			//update local storage
			this.updateLocalStorage(listId, listItems);
			return listItems;
		},
		updateSettings: function (varSetting) {
			var setting = {};
			setting.isVibrate = varSetting.isVibrate;
			setting.isNotify = varSetting.isNotify;
			
			//update settings
			var storage = localStorageService.get(localStorageKey);
			storage.settings=setting;
			localStorageService.set(localStorageKey, storage);
			
			return;
		},
		getSettings: function () {
			//get setting 
			var storage = localStorageService.get(localStorageKey);
			
			return storage.settings;
		},
		//Initialize default data storage
		initializeDefaultLocalStorageSchema: function () {

			var localDB = localStorageService.get(localStorageKey);
			if(localDB) return;
			
			var storage = {};

			//default settings
			var setting = {};
			setting.isVibrate = true;
			setting.isNotify = true;
			storage.settings=setting;

			//defaut menu list
			var menuList = [];

			var shoping = {};
			shoping.title = "Shopping List";
			shoping.listItems = [];
			menuList.push(shoping);

			var clipboards = {};
			clipboards.title = "Clipboards";
			clipboards.listItems = [];
			menuList.push(clipboards);

			var events = {};
			events.title = "Events";
			events.listItems = [];
			menuList.push(events);

			storage.menuList = menuList;

			//default local storage
			localStorageService.set(localStorageKey, storage);
		}
	}
});