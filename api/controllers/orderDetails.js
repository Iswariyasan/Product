var jwt = require('jsonwebtoken');
var OrderInfo = require('../models/orderDetails');
var productInfo = require('../models/productdetails');
var userDetails = require('../models/registration');
var mongoose = require('mongoose')

exports.createOrder = async function (req, res, next) {
    try {
        jwt.verify(req.body.token,"SecretKey", async function(err, decoded) {
            if(err){               
                return res.status(500).json({
                    message: err.message,
                    status: 500
                });                
            } else{
                var userInfo = await userDetails.findOne({email : decoded.email});
                var productDetails = await productInfo.findOne({brandName: req.body.brandName, productName: req.body.productName})
                if(userInfo && productDetails){
                    if(productDetails.quantityInStock >= Number(req.body.quantity)){
                        new OrderInfo({
                            userId: userInfo.id,
                            cancelled: false,
                            ordered: true,
                            delivered: false,
                            quantity: req.body.quantity,
                            productId: productDetails.id,
                            createdAt: Date.now(),
                            updatedAt: Date.now()
                        }).save().then(data =>{     
                            return res.status(200).json({
                                message: "Product details saved successfully",
                                status: 200,
                                orderData: data
                            });
                        });
                    } else{                                
                        return res.status(405).json({
                            message: "Product out of stock",
                            status: 405
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

exports.updateOrder = async function (req, res, next) {
    try {
        jwt.verify(req.body.token,"SecretKey",async function(err, decoded) {
            if(err){               
                return res.status(500).json({
                    message: err.message,
                    status: 500
                });                
            } else{
                var userInfo = await userDetails.findOne({email : decoded.email});
                var productDetails = await productInfo.findOne({brandName: req.body.brandName, productName: req.body.productName})
                if(userInfo && productDetails){
                    if(productDetails.quantityInStock >= req.body.quantity){
                        let orderDetails = {
                            userId: userInfo._id,
                            cancelled: false,
                            ordered: true,
                            delivered: req.body.delivered,
                            quantity: req.body.quantity,
                            productId: productDetails._id,
                            updatedAt: Date.now()
                        }
                        await OrderInfo.updateOne({_id : req.body.orderedId},{$set: orderDetails}).then(data =>{     
                            return res.status(200).json({
                                message: "Product details updated successfully",
                                status: 200,
                                orderDetails: data
                            });
                        });
                    } else{                                
                        return res.status(405).json({
                            message: "Product out of stock",
                            status: 405
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

exports.cancelOrder = async function (req, res, next) {
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
                    await OrderInfo.updateOne({_id : req.body.orderedId},{$set: {ordered: false,cancelled: true, delivered: false, updatedAt: Date.now()}}).then(data =>{     
                        return res.status(200).json({
                            message: "Product details updated successfully",
                            status: 200,
                            orderDetails: data
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