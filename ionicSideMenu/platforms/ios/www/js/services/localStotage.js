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
		getMenuItems: function () {

			var storage = localStorageService.get(localStorageKey);
			return storage.menuList;
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
		addMenuItem: function (menuTitle) {

			var menuItems = this.getMenuItems();
			
			var newMenuItem = {};
			
			newMenuItem.id=menuItems.length+1;
			newMenuItem.icon="ion-bag";
			newMenuItem.default=0;
			newMenuItem.title = menuTitle;
			newMenuItem.listItems = [];
			menuItems.push(newMenuItem);
			
			var storage = localStorageService.get(localStorageKey);
			storage.menuList=menuItems;
			localStorageService.set(localStorageKey, storage);
			
			return menuItems;
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
			shoping.id="1";
			shoping.icon="ion-bag";
			shoping.default=1;
			shoping.title = "Shopping List";
			shoping.listItems = [];
			menuList.push(shoping);

			var clipboards = {};
			clipboards.id="2"
			clipboards.icon="ion-clipboard";
			clipboards.default=1;
			clipboards.title = "Clipboards";
			clipboards.listItems = [];
			menuList.push(clipboards);

			var events = {};
			events.id="3";
			events.icon="ion-calendar";
			events.title = "Events";
			events.default=1;
			events.listItems = [];
			menuList.push(events);
			
			storage.menuList = menuList;

			//default local storage
			localStorageService.set(localStorageKey, storage);
		}
	}
});