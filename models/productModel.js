const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
        _id: {
            type: ObjectId,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        sellerId: {
            type: ObjectId,
            required: true,
        },
        sellerName: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        subCategory: {
            type: String,
            required: true,
        },
        discount: {
            type: String,
            required: true,
        },
        discountType: {
            type: String,
            required: true,
        },
        photo:{
            type: String,
            default: "",
        },
    },

    // timestamps: true is an option that tells Mongoose to automatically add two fields to your schema: 
    // createdAt and updatedAt. 
    // These fields will store the dates when the document was created and last updated, respectively.
    { timestamps: true }
)

const productCollection = mongoose.model("products", productSchema)

module.exports = productCollection;