const { ObjectId, Int32 } = require('mongodb');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
        _id: {
            type: ObjectId,
        },
        countId: {
            type: Number,
        },
        productIdList: {
            type: [ObjectId],
            required: true,
        },
        productNameList: {
            type: [String],
            required: true,
        },
        amountList: {
            type: [String],
            required: true,
        },
        sellerIdList: {
            type: [ObjectId],
            required: true,
        },
        sellerNameList: {
            type: [String],
            required: true,
        },
        stageList: {
            type: [String],
            required: true,
        },
        totalAmount: {
            type: String,
            required: true,
        },
        customerId: {
            type: ObjectId,
            required: true,
        },
        billName: {
            type: String,
            required: true,
        },
        billPhone: {
            type: String,
            required: true,
        },
        billAddress: {
            type: String,
            required: true,
        },
        shipAddress: {
            type: String,
            required: true,
        },
    },

    // timestamps: true is an option that tells Mongoose to automatically add two fields to your schema: 
    // createdAt and updatedAt. 
    // These fields will store the dates when the document was created and last updated, respectively.
    { timestamps: true }
)

const orderCollection = mongoose.model("orders", orderSchema)

module.exports = orderCollection;