const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
        _id: {
            type: ObjectId,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 10
        },
        building: {
            type: String,
            required: true,
        },
        landmark: {
            type: String,
            required: true,
        },
        area: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        productsList: {
            type: [ObjectId],
            default: []
        },
        ordersList: {
            type: [ObjectId],
            default: []
        },
    },

    // timestamps: true is an option that tells Mongoose to automatically add two fields to your schema: 
    // createdAt and updatedAt. 
    // These fields will store the dates when the document was created and last updated, respectively.
    { timestamps: true }
)

const sellerCollection = mongoose.model("sellers", sellerSchema)

module.exports = sellerCollection;