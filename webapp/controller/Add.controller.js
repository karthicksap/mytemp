sap.ui.define([
	"dem/fin/sr/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(BaseController, JSONModel, MessageToast, MessageBox) {

	return BaseController.extend("dem.fin.sr.controller.Add", {

		onInit: function() {

			this.oLocal = new JSONModel({

				"productData": {

					"PRODUCT_ID": "",
					"TYPE_CODE": "PR",
					"CATEGORY": "Notebooks",
					"NAME": "",
					"DESCRIPTION": "",
					"SUPPLIER_ID": "0100000048",
					"SUPPLIER_NAME": "DelBont Industries",
					"TAX_TARIF_CODE": "1 ",
					"MEASURE_UNIT": "EA",
					"PRICE": "",
					"CURRENCY_CODE": "EUR",
					"DIM_UNIT": "CM"
				}

			});

			this.getView().setModel(this.oLocal, "data");

		},

		onSave: function() {

			var payload = this.oLocal.getProperty("/productData");

			this.getView().getModel().create("/ProductSet", payload, {

				success: function() {

					MessageToast.show("Product has been created successfully!");

				},

				error: function(error) {

					MessageBox.error(JSON.parse(error.responseText).error.innererror.errordetails[0].message);

				}

			});

		},

		onChange: function() {

			this.productId = this.oLocal.getProperty("/productData/PRODUCT_ID");

			var that = this;

			this.getView().getModel().read("/ProductSet('" + this.productId + "')", {
				success: function(data) {

					that.oLocal.setProperty("/productData", data);

				}

			});
		},
		
		onDelete: function() {

			this.getView().getModel().remove("/ProductSet('" + this.productId + "')",{
				
			success: function(){
				
				MessageToast.show("Product has been deleted successfully!");
			},
			
			error: function(error){
				
			MessageBox.error(JSON.parse(error.responseText).error.innererror.errordetails[0].message);
				
			}
				
			});

		},
		
		onLoad: function(){
			
			var that = this;
			
			this.getView().getModel().callFunction("/GetMostExpensiveProduct", {
				
				urlParameters: {
					
					"I_CATEGORY": "Notebooks"
				},
				
				success: function(data){
					
					that.oLocal.setProperty("/productData", data);
				}
			});
		}

	});

});