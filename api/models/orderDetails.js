var mongoose = require('mongoose');
var schema = mongoose.Schema;

var OrderDetails = new schema({
    delivered: {
        type: Boolean,
        default: false
    },
    ordered: {
        type: Boolean,
        default: false
    },
    cancelled: {
        type: Boolean,
        default: false
    },
    quantity: {
        type: Number
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductDetails'
    },    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'
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

module.exports = mongoose.model('OrderDetails',OrderDetails);