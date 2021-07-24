sap.ui.define([
	"sap/ui/core/UIComponent"
], function(UIComponent) {

	return UIComponent.extend("dem.fin.sr.Component", {

			metadata:{
				
				manifest: "json"
				
			},
			
		init: function() {

			UIComponent.prototype.init.apply(this);
			
			var oRouter = this.getRouter();
			
			oRouter.initialize();

		},

		// createContent: function() {

		// 	// var oView = new sap.ui.view({

		// 	// 	type: "XML",
		// 	// 	viewName: "dem.fin.sr.view.App",
		// 	// 	id: "myView"

		// 	// });
			
		// 	// var oView1 = new sap.ui.view({

		// 	// 	type: "XML",
		// 	// 	viewName: "dem.fin.sr.view.View1",
		// 	// 	id: "idView1"

		// 	// });
			
		// 	// var oView2 = new sap.ui.view({

		// 	// 	type: "XML",
		// 	// 	viewName: "dem.fin.sr.view.View2",
		// 	// 	id: "idView2"

		// 	// });

		// 	// var oSap = new sap.ui.view({

		// 	// 	type: "XML",
		// 	// 	viewName: "dem.fin.sr.view.Sap",
		// 	// 	id: "idSap"

		// 	// });
			
		// 	// var oApp = oView.byId("idApp");
			
		// 	// oApp.addMasterPage(oView1).addDetailPage(oSap).addDetailPage(oView2);
			
		// 	// return oView;
			
		// },

		destroy: function() {

		}

	});

});