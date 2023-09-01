sap.ui.define(
  [
    "ats/fin/ap/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
  ],
  function (BaseController, JSONModel, MessageBox, MessageToast, Fragment) {
    "use strict";
    return BaseController.extend("ats.fin.ap.Add", {
      mode: "Create",
      onInit: function () {
        //alert("Wallah! We are ready anubhav 🤣");
        this.oLocalModel = new JSONModel();
        this.oLocalModel.setData({
          orderData: {
            SoId: "",
            CreatedBy: "400000038",
            BuyerId: "100000004",
            BuyerName: "Panorama Studios",
            CurrencyCode: "EUR",
            GrossAmount: "101299.22",
            NetAmount: "85125.40",
            TaxAmount: "16173.82",
            LifecycleStatus: "N",
            BillingStatus: "",
            DeliveryStatus: "",
            To_Items: [
              {
                SoItemPos: "10",
                ProductId: "HT-1500",
                CurrencyCode: "EUR",
                GrossAmount: "5950.00",
                Quantity: "1",
                QuantityUnit: "EA",
              },
              {
                SoItemPos: "20",
                ProductId: "HT-1501",
                CurrencyCode: "JPY",
                GrossAmount: "3570000",
                Quantity: "2",
                QuantityUnit: "EA",
              },
            ],
          },
          prodData: {
            PRODUCT_ID: "",
            TYPE_CODE: "PR",
            CATEGORY: "Notebooks",
            NAME: "",
            DESCRIPTION: "",
            SUPPLIER_ID: "0100000051",
            SUPPLIER_NAME: "TECUM",
            TAX_TARIF_CODE: "1 ",
            MEASURE_UNIT: "EA",
            PRICE: "0.00",
            CURRENCY_CODE: "USD",
            DIM_UNIT: "CM",
            PRODUCT_PIC_URL: "/sap/public/bc/NWDEMO_MODEL/IMAGES/YG-2021.jpg",
          },
        });
        this.getView().setModel(this.oLocalModel, "local");

        //The odata model is my default model set at the app level
        this.oDataModel = this.getOwnerComponent().getModel();
        this.setMode("Create");
      },
      setMode: function (sMode) {
        this.mode = sMode;
        if (this.mode === "Create") {
          this.getView().byId("idSave").setText("Create");
          this.getView().byId("idDelete").setEnabled(false);
          this.getView().byId("name").setEnabled(true);
        } else {
          this.getView().byId("idSave").setText("Update");
          this.getView().byId("idDelete").setEnabled(true);
          this.getView().byId("name").setEnabled(false);
        }
      },
      onSave: function () {
        //Are we on order tab or on product tab
        var tabKey = this.getView().byId("type").getSelectedKey();
        if (tabKey === "order") {
          //Step 1: Get the payload
          var payload = this.oLocalModel.getProperty("/orderData");
          this.oDataModel.create("/SalesOrderSet", payload, {
            //Step 5: Handle Response - success
            success: function (data) {
              var sMsg = "Wallah! the order has been created in SAP! " + data.SoId;
              MessageToast.show(
                sMsg
              );
            },
            //Step 6: Handle Response - error
            error: function (oError) {
              //debugger;
              MessageBox.error(
                "Oops!! something was wrong - " +
                  JSON.parse(oError.responseText).error.innererror
                    .errordetails[0].message
              );
            },
          });
        } else {
          //Step 1: Get the payload
          var payload = this.oLocalModel.getProperty("/prodData");
          //Step 2: Validate the data before sent to SAP
          if (payload.PRODUCT_ID === "") {
            MessageBox.error("Please enter valid product id");
            return;
          }
          //Step 3: Get the odata model object - check line 32
          //Step 4: Call .create which will trigger POST on odata
          if (this.mode === "Update") {
            this.oDataModel.update(
              "/ProductSet('" + this.prodId + "')",
              payload,
              {
                //Step 5: Handle Response - success
                success: function (data) {
                  MessageToast.show(
                    "Wallah! the product has been UPDATED in SAP!"
                  );
                },
                //Step 6: Handle Response - error
                error: function (oError) {
                  //debugger;
                  MessageBox.error(
                    "Oops!! something was wrong - " +
                      JSON.parse(oError.responseText).error.innererror
                        .errordetails[0].message
                  );
                },
              }
            );
          } else {
            this.oDataModel.create("/ProductSet", payload, {
              //Step 5: Handle Response - success
              success: function (data) {
                MessageToast.show(
                  "Wallah! the product has been created in SAP!"
                );
              },
              //Step 6: Handle Response - error
              error: function (oError) {
                //debugger;
                MessageBox.error(
                  "Oops!! something was wrong - " +
                    JSON.parse(oError.responseText).error.innererror
                      .errordetails[0].message
                );
              },
            });
          }
        }
      },
      onClear: function () {
        this.setMode("Create");
        this.oLocalModel.setProperty("/prodData", {
          PRODUCT_ID: "",
          TYPE_CODE: "PR",
          CATEGORY: "Notebooks",
          NAME: "",
          DESCRIPTION: "",
          SUPPLIER_ID: "0100000051",
          SUPPLIER_NAME: "TECUM",
          TAX_TARIF_CODE: "1 ",
          MEASURE_UNIT: "EA",
          PRICE: "0.00",
          CURRENCY_CODE: "EUR",
          DIM_UNIT: "CM",
          PRODUCT_PIC_URL: "/sap/public/bc/NWDEMO_MODEL/IMAGES/YG-2021.jpg",
        });
      },
      prodId: null,
      onLoadProduct: function (oEvent) {
        //Step 1: read data enetered by user - productid
        this.prodId = oEvent.getParameter("value");
        //Step 2: call odata service to read single product data
        var that = this;
        this.oDataModel.read("/ProductSet('" + this.prodId + "')", {
          //Step 3: handle success- set data to local model
          success: function (record) {
            that.oLocalModel.setProperty("/prodData", record);
            that.setMode("Update");
            that
              .getView()
              .byId("myPhoto")
              .setSrc(
                "/sap/opu/odata/sap/ZANU_ODATA_SRV/ProductImgSet('" +
                  record.PRODUCT_ID +
                  "')/$value"
              );
          },
          //step 4: handle error - msg and clear screen
          error: function (oError) {
            MessageBox.error(
              "Oops!! something was wrong - " +
                JSON.parse(oError.responseText).error.innererror.errordetails[0]
                  .message
            );
            that.onClear();
            that.setMode("Create");
          },
        });
      },
      oSupplierPopup: null,
      oField: null,
      onF4Supplier: function (oEvent) {
        this.oField = oEvent.getSource();
        //PBO to avoid creating ALV again and again
        //here we create a local copy of this variable
        var that = this;
        if (!this.oSupplierPopup) {
          Fragment.load({
            name: "ats.fin.ap.fragments.popup",
            type: "XML",
            id: "supplier",
            controller: this,
          }).then(function (oPopup) {
            // A local variable can be accessed in promise function
            that.oSupplierPopup = oPopup;
            that.oSupplierPopup.bindAggregation("items", {
              path: "/SupplierSet",
              template: new sap.m.StandardListItem({
                icon: "sap-icon://supplier",
                description: "{COMPANY_NAME}",
                title: "{BP_ID}",
              }),
            });
            that.oSupplierPopup.setTitle("Select Supplier");
            //allowing the immune system to access body parts to a parasite
            //the view allowing fragement to access model
            that.getView().addDependent(that.oSupplierPopup);
            that.oSupplierPopup.open();
          });
        } else {
          this.oSupplierPopup.open();
        }
      },
      onConfirmPopup: function (oEvent) {
        var sId = oEvent.getSource().getId();
        var oSelectedItem = oEvent.getParameter("selectedItem");
        var sName = oSelectedItem.getTitle();
        var sDescription = oSelectedItem.getDescription();
        this.oLocalModel.setProperty("/prodData/SUPPLIER_ID", sName);
        this.oLocalModel.setProperty("/prodData/SUPPLIER_NAME", sDescription);
      },
      onLoadExpensive: function () {
        //Step 1: know what was the category selected by user
        var sCategory = this.getView().byId("category").getSelectedKey();
        var that = this;
        //Step 2: call odata function - callFunction to make call to FI
        this.oDataModel.callFunction("/GetMostExpensiveProduct", {
          urlParameters: {
            I_CATEGORY: sCategory,
          },
          success: function (record) {
            that.oLocalModel.setProperty("/prodData", record);
            that.setMode("Update");
            that
              .getView()
              .byId("myPhoto")
              .setSrc(
                "/sap/opu/odata/sap/ZANU_ODATA_SRV/ProductImgSet('" +
                  record.PRODUCT_ID +
                  "')/$value"
              );
          },
          error: function () {
            MessageBox.error(
              "Oops!! something was wrong - " +
                JSON.parse(oError.responseText).error.innererror.errordetails[0]
                  .message
            );
            that.onClear();
            that.setMode("Create");
          },
        });
        //Step 3: Handle response
      },
      onConfirm: function (status) {
        if (status === "OK") {
          var that = this;
          this.oDataModel.remove("/ProductSet('" + this.prodId + "')", {
            success: function () {
              MessageToast.show("Delete done");
              that.onClear();
            },
          });
        }
      },
      onDelete: function () {
        MessageBox.confirm("Would you like to delete this product", {
          onClose: this.onConfirm.bind(this),
        });
      },
    });
  }
);
