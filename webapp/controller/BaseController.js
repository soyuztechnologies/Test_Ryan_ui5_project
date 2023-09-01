sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'ats/fin/ap/util/formatter',    
    'sap/ui/model/FilterOperator'
], function(Controller, Formatter,FilterOperator) {
    'use strict';
    return Controller.extend("ats.fin.ap.BaseController",{
        formatter: Formatter,
        FilterOperator: FilterOperator
    });
});