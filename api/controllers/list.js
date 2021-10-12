var jwt = require('jsonwebtoken');
var productInfo = require('../models/productdetails');
var OrderInfo = require('../models/orderDetails');
var userDetails = require('../models/registration');

exports.customerList = async function (req, res, next) {
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
                    await OrderInfo.find({userId: userInfo._id}).sort({updatedAt: -1}).then(data =>{                             
                        return res.status(200).json({
                            message: "Product details saved successfully",
                            status: 200,
                            productDetails: data
                        });
                    }).catch (err => {                  
                        return res.status(500).json({
                            message: err.message,
                            status: 500
                        }); 
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

exports.productList = async function (req, res, next) {
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
                    await OrderInfo.find({userId: userInfo._id, delivered: true}).sort({updatedAt: -1}).then(data =>{                             
                        return res.status(200).json({
                            message: "Product details saved successfully",
                            status: 200,
                            productDetails: data,
                            countOfProducts: data.length
                        });
                    }).catch (err => {                  
                        return res.status(500).json({
                            message: err.message,
                            status: 500
                        }); 
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

exports.orderedProductList = async function (req, res, next) {
    try {
        let countArray = [];
        jwt.verify(req.body.token,"SecretKey",async function(err, decoded) {
            if(err){               
                return res.status(500).json({
                    message: err.message,
                    status: 500
                });                
            } else{
                var userInfo = await userDetails.findOne({email : decoded.email});
                if(userInfo){
                    let productNameList = await productInfo.find({});
                    if(productNameList.length > 0){
                        for (let productIndex = 0; productIndex < productNameList.length; productIndex++) {
                            await OrderInfo.find({productId: productNameList[productIndex]._id, delivered: true}).sort({updatedAt: -1}) .then(data =>{                             
                                let details = {
                                    countOfProducts: data.length,
                                    productName: productNameList[productIndex].productName,
                                }
                                countArray.push(details);
                            }).catch (err => {                  
                                return res.status(500).json({
                                    message: err.message,
                                    status: 500
                                }); 
                            });                     
                        }                                          
                        return res.status(200).json({
                            message: "Fetched data",
                            status: 200,
                            data: countArray
                        }); 
                    }
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