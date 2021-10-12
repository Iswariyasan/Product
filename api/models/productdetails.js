var mongoose = require('mongoose');
var schema = mongoose.Schema;

var productDetails = new schema({
    _id: mongoose.Schema.Types.ObjectId,
    brandName:{
        type: String
    },
    productValue: {
        type: Number
    },
    quantityInStock: {
        type: Number
    },
    productName: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('ProductDetails',productDetails);