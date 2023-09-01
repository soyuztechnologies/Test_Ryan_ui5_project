sap.ui.define([
    
], function() {
    'use strict';
    return {
        getStatus: function(status){
            switch (status) {
                case 'A':
                    return "Available";
                    break;
                case 'D':
                    return "Discontinued";
                    break;
                case 'O':
                    return "Out of stock";
                    break;
                default:
                    break;
            }
        },
        getState: function(status){
            switch (status) {
                case 'A':
                    return "Success";
                    break;
                case 'D':
                    return "Error";
                    break;
                case 'O':
                    return "Warning";
                    break;
                default:
                    break;
            }
        }
    }
});