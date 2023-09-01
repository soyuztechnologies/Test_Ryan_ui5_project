sap.ui.define([
    'ats/fin/ap/controller/BaseController',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(BaseController, Filter, FilterOperator) {
    'use strict';
    return BaseController.extend("ats.fin.ap.controller.View1",{
        onInit: function(){
            var oRouter = this.getOwnerComponent().getRouter();
            this.oRouter = oRouter;
        },
        onGoTo: function(sIndex){

            //Get the object of router
            
            //ask router to navigate
            this.oRouter.navTo("jack",{
                fruitId: sIndex
            });

            //Step 1: Get the App Container class object where we embedded our views
            //        A is asking to Mom
            //var oAppCon = this.getView().getParent().getParent();
            //Step 2: Container has API .to to navigate
            //oAppCon.toDetail("idView2");
            //alert("this functionality is under construction 😉");
        },
        onItemDelete: function(oEvent){
            //Step 1: Get the object of item on which delete was pressed
            var oToBeDeleted = oEvent.getParameter("listItem");

            //Step 2: Get the object of list control
            var oList = oEvent.getSource();

            //Step 3: Fire function of list to perform delete
            oList.removeItem(oToBeDeleted);

        },
        onSelectItem: function(oEvent){
            //Step 1: Obtain the path of selected item (element)
            var oSelectedItem = oEvent.getParameter("listItem");
            var sPath = oSelectedItem.getBindingContextPath();
            //Step 2: get the object of View 2
            //var oView2 = this.getView().getParent().getPage("idView2");
            // var oView2 = this.getView().getParent().getParent().getDetailPage("idView2");
            // //Step 3: Perform binding with view 2 whole of the first element
            // oView2.bindElement(sPath);

            ///fruits/3 ==> fruits 3
            var sIndex = sPath.split("/")[sPath.split("/").length - 1 ];

            //Navigate to next screen
            this.onGoTo(sIndex);
        },
        
        onSearch: function(oEvent){
            //Step 1: what was the value entered by user in search field - oEvent-query
            var sVal = oEvent.getParameter("query");
            //Step 2: construct a filter object - just like a condition Property Opr Value
            var oFilter1 = new Filter("CATEGORY", FilterOperator.Contains, sVal);
            //Step 3: Get the list control object
            var oList = this.getView().byId("idList");
            //Step 4: We have binding inside the list -- items -- inject our filter inside
            oList.getBinding("items").filter(oFilter1);

        },
        onAdd: function(){
            this.oRouter.navTo("add");
        },
        onOrder: function(){
            this.onGoTo();
        }
    });
});