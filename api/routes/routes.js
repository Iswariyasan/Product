'use strict';
var multer = require('multer');
var path =require('path');

module.exports = function (app) {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
             cb(null,path.join(__dirname,'../uploads'));
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    });
    var xslx = multer({ storage: storage });

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

    var uploadXlsx = require('../controllers/uploadXlsx'); 
    // upload for single file   
    // app.route('/api/upload').post(xslx.single('file'), uploadXlsx.masterSheets);
    // upload for multiple files with 40 file limit
    app.route('/api/upload').post(xslx.array('file', 40), uploadXlsx.masterSheets);

};
