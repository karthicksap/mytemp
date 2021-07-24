sap.ui.define([
	"dem/fin/sr/controller/BaseController",
	"sap/ui/core/routing/History"
], function(BaseController, History) {

	return BaseController.extend("dem.fin.sr.controller.Supplier", {

		onInit: function() {

			this.oRouter = this.getOwnerComponent().getRouter();

			this.oRouter.getRoute("third").attachMatched(this.simha, this);

		},

		simha: function(oEvent) {

			var sId = oEvent.getParameter("arguments").sId;

			var elementAddress = "/suppliers/" + sId;

			this.getView().bindElement(elementAddress);

		},

		onBack: function() {
			
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("start", true);
			}
		}
	});

});