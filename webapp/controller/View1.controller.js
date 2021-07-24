sap.ui.define([
	"dem/fin/sr/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"dem/fin/sr/util/Formatter"
], function(BaseController, Filter, FilterOperator, Formatter) {

	return BaseController.extend("dem.fin.sr.controller.View1", {

		onInit: function() {

			this.oList = this.getView().byId("idList");

			this.oRouter = this.getOwnerComponent().getRouter();

		},

		onNext: function() {

			var oAppCont = this.getView().getParent();

			var aSelectedItems = this.getSelectedItems();

			var aData = [];

			for (var i = 0; i < aSelectedItems.length; i++) {

				aData.push(this.getView().getModel().getProperty(aSelectedItems[i].getBindingContextPath()));

			}

			this.getView().getModel().setProperty("/selectedFruits", aData);

			oAppCont.to("idView2");
		},

		format: Formatter,

		onSearch: function(oEvent) {

			var searchValue = oEvent.getParameter("query");

			var oFilter1 = new Filter("name", FilterOperator.Contains, searchValue);
			var oFilter2 = new Filter("type", FilterOperator.Contains, searchValue);

			var oFilterFin = new Filter({

				filters: [oFilter1, oFilter2],
				and: false

			});

			this.oList.getBinding("items").filter(oFilterFin);

		},

		onLive: function(oEvent) {

			var searched = oEvent.getParameter("newValue");

			var oFilter1 = new Filter("name", FilterOperator.Contains, searched);
			var oFilter2 = new Filter("type", FilterOperator.Contains, searched);

			var oFilterFin = new Filter({

				filters: [oFilter1, oFilter2],
				and: false

			});

			this.oList.getBinding("items").filter(oFilterFin);

		},

		onDelete: function(oEvent) {

			var oListItem = oEvent.getParameter("listItem");

			this.oList.removeItem(oListItem);
		},

		onMultiDel: function(oEvent) {

			var aSelectedItems = this.getSelectedItems();

			for (var i = 0; i < aSelectedItems.length; i++) {

				this.oList.removeItem(aSelectedItems[i]);
			}

		},

		getSelectedItems: function() {

			return this.oList.getSelectedItems();

		},

		onItemPress: function(oEvent) {

			var oElementAddress = oEvent.getParameter("listItem").getBindingContextPath();

			var endPoint = oElementAddress.split("/")[oElementAddress.split("/").length - 1];

			this.nav(endPoint);

		},

		onAdd: function() {

			this.oRouter.navTo("final");
		},

		nav: function(sId) {

			this.oRouter.navTo("sec", {

				"fId": sId
			});
		}

	});

});