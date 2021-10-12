var jwt = require('jsonwebtoken');
var productInfo = require('../models/productdetails');
var userDetails = require('../models/registration');

exports.saveProduct = async function (req, res, next) {
    try {
        jwt.verify(req.body.token,"SecretKey",async function(err, decoded) {
            if(err){               
                return res.status(500).json({
                    message: err.message,
                    status: 500
                });                
            } else{
                var userInfo = await userDetails.findOne({email : decoded.email});
                if(userInfo){
                    var productDetails = {
                        brandName: req.body.brandName,
                        productValue: req.body.productValue,
                        quantityInStock: req.body.quantityInStock,
                        productName: req.body.productName,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    }        
                    await productInfo.updateOne({brandName: req.body.brandName,productName: req.body.productName}, { $set: productDetails }, { upsert: true });                                
                    return res.status(200).json({
                        message: "Product details saved successfully",
                        status: 200
                    });

                } else{                                 
                    return res.status(402).json({
                        message: "Invalid emailId",
                        status: 402
                    });  
                }
            }
        });        
    } catch (error) {                  
        return res.status(500).json({
            message: error.message,
            status: 500
        });        
    }
}