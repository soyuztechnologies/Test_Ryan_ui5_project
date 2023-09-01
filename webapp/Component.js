sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    return UIComponent.extend("ats.fin.ap.Component",{
        metadata: {
            manifest: "json"
        },
        init: function(){
            //call base class constructor
            UIComponent.prototype.init.apply(this);

            //1. Get the router object from parent class
            var oRouter = this.getRouter();

            //2. Initialize router object, the moment we initialize, 
            //    it will look for routing configuration, if the configuration 
            //    is not found in manifest.json it will dump
            oRouter.initialize();

        },
        // createContent: function(){

        //     //this is the root view of our app
        //     var oAppView = new sap.ui.view({
        //         id:"idRootView",
        //         viewName: 'ats.fin.ap.view.App',
        //         type: "XML"
        //     });

        //     //From the App View object we now obtain the container control object
        //     var oAppCon = oAppView.byId("idAppCon");

        //     //Now we create our view objects
        //     var oView1 = new sap.ui.view({
        //         id:"idView1",
        //         viewName: 'ats.fin.ap.view.View1',
        //         type: "XML"
        //     });

        //     var oView2 = new sap.ui.view({
        //         id:"idView2",
        //         viewName: 'ats.fin.ap.view.View2',
        //         type: "XML"
        //     });

        //     var oEmpty = new sap.ui.view({
        //         id:"idEmpty",
        //         viewName: 'ats.fin.ap.view.Empty',
        //         type: "XML"
        //     });
        //     //Add these view objects inside the pages aggregation of App Container Control
        //     //For this we use *addPage()* function from SDK -- chaining
        //     //The container here is your Mother, and views are Child
        //     oAppCon.addMasterPage(oView1).addDetailPage(oEmpty).addDetailPage(oView2);


        //     return oAppView;
        // },
        destroy: function(){

        }
    });
});