'use strict';

module.exports = function (app) {

    var userSignup = require('../controllers/userSignup');
    app.route('/api/userSignup').post(userSignup.userSignUP);
    app.route('/api/login').post(userSignup.login)

    var saveProductDetails = require('../controllers/saveProduct');
    app.route('/api/saveProductDetails').post(saveProductDetails.saveProduct);

    var orderDetails = require('../controllers/orderDetails');
    app.route('/api/createOrder').post(orderDetails.createOrder);
    app.route('/api/updateOrder').post(orderDetails.updateOrder);
    app.route('/api/cancelOrder').post(orderDetails.cancelOrder);

    var listDetails = require('../controllers/list');
    app.route('/api/orderedList').get(listDetails.orderedProductList); 
    app.route('/api/customerList').get(listDetails.customerList);
    app.route('/api/productList').get(listDetails.productList);

};
