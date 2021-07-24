sap.ui.define([
	"dem/fin/sr/controller/BaseController",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(BaseController, MessageBox, MessageToast, Fragment, Filter, FilterOperator) {

	return BaseController.extend("dem.fin.sr.controller.View2", {

		onInit: function() {

			this.oRouter = this.getOwnerComponent().getRouter();

			this.oRouter.getRoute("sec").attachMatched(this.booby, this);

		},

		booby: function(oEvent) {

			var fId = oEvent.getParameter("arguments").fId;

			var elementAddress = "/" + fId;

			MessageToast.show("Booby is called Path is: " + elementAddress);

			this.getView().bindElement({
				
				path: elementAddress,
				parameters: { expand: 'To_Supplier,To_OrderItems' }
				
			});

		},

		onBack: function() {

			var oAppCon = this.getView().getParent();

			oAppCon.to("idView1");
		},

		onSave: function() {

			MessageBox.confirm("Do you want save this", {

				title: "Confirm",
				onClose: this.onClose

			});

		},

		onClose: function(oAction) {

			if (oAction === "OK") {

				MessageBox.success("Data saved successfully", {

					title: "Success"

				});

			} else {

				MessageBox.error("cancelled", {

					title: "Error"

				});

			}
		},

		onListPress: function(oEvent) {

			var elementAddress = oEvent.getParameter("listItem").getBindingContextPath();

			this.oRouter.navTo("third", {

				sId: elementAddress.split("/")[elementAddress.split("/").length - 1]

			});
		},

		oFragment1: null,
		oFragment2: null,

		onFilter: function() {

			if (!this.oFragment1) {

				Fragment.load({

					name: "dem.fin.sr.fragments.Popup",
					controller: this,
					id: "idSupp"

				}).then(this.openPopup.bind(this));

			} else {

				this.oFragment1.open();

			}

		},

		openPopup: function(oFragment) {

			this.oFragment1 = oFragment;
			// Bind data
			this.getView().addDependent(this.oFragment1);
			this.oFragment1.bindAggregation("items", {

				path: "/suppliers",
				template: new sap.m.StandardListItem({

					icon: "sap-icon://supplier",
					title: "{name}",
					description: "{city}"

				})

			});

			this.oFragment1.setTitle("Suppliers").setMultiSelect(true).open();
		},

		oInput: null,

		onValueHelp: function(oEvent) {

			this.oInput = oEvent.getSource();

			if (!this.oFragment2) {

				Fragment.load({

					name: "dem.fin.sr.fragments.Popup",
					controller: this,
					id: "idCity"

				}).then(this.openCity.bind(this));

			} else {

				this.oFragment2.open();

			}

		},

		openCity: function(oFragment) {

			this.oFragment2 = oFragment;
			// Bind data
			this.getView().addDependent(this.oFragment2);

			this.oFragment2.bindAggregation("items", {

				path: "/cities",
				template: new sap.m.StandardListItem({

					title: "{name}",
					icon: "sap-icon://home"
				})

			});

			this.oFragment2.setTitle("City List").open();

		},

		onConfirm: function(oEvent) {

			var id = oEvent.getParameter("id");

			if (id.indexOf("idSupp") === -1) {

				this.cityFilter(oEvent.getParameter("selectedItem").getTitle());

			} else {

				this.supplierFilter(oEvent.getParameter("selectedItems"));

			}

		},

		cityFilter: function(sValue) {

			this.oInput.setValue(sValue);

		},

		supplierFilter: function(aItems) {

			// step 1: Fiter variables
			// step 2: Build condition/filer
			var aFilter = [];
			
			for(var i=0; i<aItems.length; i++){
				
				var oFilter = new Filter("name", FilterOperator.Contains, aItems[i].getTitle());
				aFilter.push(oFilter);
				
			}
			
			var oFilterFin = new Filter({
				
				filters: aFilter,
				and: false
			});
			
			// Get Binding & inject filter
			// this.oFragment1.getBinding("items").filter(oFilterFin);
			this.getView().byId("idTab").getBinding("items").filter(oFilterFin);

		}

	});

});