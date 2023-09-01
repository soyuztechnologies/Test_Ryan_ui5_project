sap.ui.define([
    'ats/fin/ap/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/routing/History'
], function(BaseController, MessageBox, MessageToast, History) {
    'use strict';
    return BaseController.extend("ats.fin.ap.controller.SupplierDetail",{
        onInit:function(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("toson").attachMatched(this.turakmakto, this);
        },
        //This function will trigger automtically everytime route changes
        turakmakto: function(oEvent){
            var sIndex = oEvent.getParameter("arguments").supplierId;
            var sPath = '/supplier/' + sIndex;
            this.getView().bindElement(sPath);
            //debugger;
        },
        onBack: function(){
            var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("jack", {fruitId: 0}, true);
			}
        }
    });
});