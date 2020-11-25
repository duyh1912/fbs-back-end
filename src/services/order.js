(function () {
    const mongoose = require('mongoose');
    const orders = require('../model/OrderDetailsModel');


    exports.createOrderDetails = function (order, callback) {
        orders.insertMany(order).then((response) => {
            callback(null, response);
        }, (error) => {
            callback(error, null);
        });
    };

   

})();
