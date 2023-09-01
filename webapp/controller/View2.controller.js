sap.ui.define([
    'ats/fin/ap/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter'
], function(BaseController, MessageBox, MessageToast, Fragment, Filter) {
    'use strict';
    return BaseController.extend("ats.fin.ap.controller.View2",{
        onInit:function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("jack").attachMatched(this.turakmakto, this);
        },
        //This function will trigger automtically everytime route changes
        turakmakto: function(oEvent){
            var sIndex = oEvent.getParameter("arguments").fruitId;
            var sPath = '/' + sIndex;
            this.getView().bindElement({
                path: sPath,
                parameters: {expand: 'To_Supplier'}
            });
            //debugger;
        },
        onSuppSelect: function(oEvent){
            var oSelectedItem = oEvent.getParameter("listItem");
            var sPath = oSelectedItem.getBindingContextPath();
            
            var sIndex = sPath.split("/")[sPath.split("/").length - 1 ];
            this.oRouter.navTo("toson",{
                supplierId: sIndex
            });
            //Navigate to next screen
            
        },
        oSupplierPopup: null,
        oCityPopup: null,
        suppFilter: function(){
            //PBO to avoid creating ALV again and again
            //here we create a local copy of this variable
            var that = this;
            if(!this.oSupplierPopup){
                Fragment.load({
                    name: 'ats.fin.ap.fragments.popup',
                    type: 'XML',
                    id: 'supplier',
                    controller: this
                }).then(function(oPopup){
                    // A local variable can be accessed in promise function 
                    that.oSupplierPopup = oPopup;
                    that.oSupplierPopup.bindAggregation("items",{
                        path: '/supplier',
                        template: new sap.m.StandardListItem({
                            icon: 'sap-icon://supplier',
                            description: '{city}',
                            title: '{name}'
                        })
                    });
                    that.oSupplierPopup.setTitle("Select Supplier");
                    //allowing the immune system to access body parts to a parasite
                    //the view allowing fragement to access model
                    that.getView().addDependent(that.oSupplierPopup)
                    that.oSupplierPopup.open();
                });
            }else{
                this.oSupplierPopup.open();
            }
            
        },
        oField: null,
        cityValueHelp: function(oEvent){
            this.oField = oEvent.getSource();
            var that = this;
            if(!this.oCityPopup){
                Fragment.load({
                    name: 'ats.fin.ap.fragments.popup',
                    type: 'XML',
                    id: 'city',
                    controller: this
                }).then(function(oPopup){
                    // A local variable can be accessed in promise function 
                    that.oCityPopup = oPopup;
                    that.oCityPopup.bindAggregation("items",{
                        path: '/cities',
                        template: new sap.m.StandardListItem({
                            icon: 'sap-icon://home',
                            description: '{famousFor}',
                            title: '{name}'
                        })
                    });
                    that.oCityPopup.setTitle("Select City");
                    //allowing the immune system to access body parts to a parasite
                    //the view allowing fragement to access model
                    that.getView().addDependent(that.oCityPopup)
                    that.oCityPopup.open();
                });
            }else{
                this.oCityPopup.open();
            }
        },
        onConfirmPopup: function(oEvent){
            var sId = oEvent.getSource().getId();
            var oSelectedItem = oEvent.getParameter("selectedItem");
            var sName = oSelectedItem.getTitle();
            if(sId.indexOf("city") != -1){
                this.oField.setValue(sName);
            }else{
                this.getView().byId("suppTab").getBinding("items").filter(
                    [new Filter("name", this.FilterOperator.EQ, sName)]
                );
            }
            
        },
        onBack: function(){
            //Step 1: Get the App Container class object where we embedded our views
            //        A is asking to Mom
            var oAppCon = this.getView().getParent();
            //Step 2: Container has API .to to navigate
            oAppCon.to("idView1");

            //alert("this functionality is under construction 😉");
        },
        onSave: function(){
            MessageBox.confirm("Would you like to order fruits?",{
                title: "Confirm your order",
                onClose: function(choice){
                    if(choice === "OK"){
                        MessageToast.show("Your order has been placed successfully");
                    }else{
                        MessageBox.error("OOPS! it was cancelled");
                    }                    
                }
            });
        }
    });
});