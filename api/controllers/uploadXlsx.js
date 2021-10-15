var XLSX = require('xlsx');
var productInfo = require('../models/productdetails');

exports.masterSheets = async function (req, res){
    try {
        if(req.files.length > 0){
            // forLoop for multiple xlsx files
            for (let filesIndex = 0; filesIndex < req.files.length; filesIndex++) {
                const url = req.files[filesIndex].path;
                var workbook = XLSX.readFile(url);
                var sheet_name_list = workbook.SheetNames;
                // forLoop for multiple sheets
                for (let sheetsIndex = 0; sheetsIndex < sheet_name_list.length; sheetsIndex++) {
                    var result= XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[sheetsIndex]],{defval:" "});
                    for (let resultIndex = 0; resultIndex < result.length; resultIndex++) {
                        var productDetails = {
                            brandName: result[resultIndex].brandName,
                            productValue: result[resultIndex].productValue,
                            quantityInStock: result[resultIndex].quantityInStock,
                            productName: result[resultIndex].productName,
                            createdAt: Date.now(),
                            updatedAt: Date.now()
                        }        
                        await productInfo.updateOne({brandName: result[resultIndex].brandName,productName: result[resultIndex].productName}, { $set: productDetails }, { upsert: true });     
                    }             
                }       
            }
            return res.status(200).json({
                message: "File uploaded successfully",
                status: 200
            }); 
        } else{                                
            return res.status(402).json({
                message: "Please upload valid excel file",
                status: 402
            });     
        }        
    } catch (error) {                 
        return res.status(500).json({
            message: error.message,
            status: 500
        });         
    }
}
