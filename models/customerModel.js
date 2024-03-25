const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
        _id: {
            type: ObjectId,
        },
        profilePic:{
            type: String,
            default: "",
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
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
        gender: {
            type: String,
            required: true,
        },
        birthday: {
            type: String,
            required: true,
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
        favorite: {
            type: [ObjectId], // Array of favorite products IDs
            default: []
        },
        bag: {
            type: [ObjectId], // Array of bag products IDs
            default: []
        },
        orders: {
            type: [String], // Array of orders IDs
            default: []
        },
    },

    // timestamps: true is an option that tells Mongoose to automatically add two fields to your schema: 
    // createdAt and updatedAt. 
    // These fields will store the dates when the document was created and last updated, respectively.
    { timestamps: true }
)

const customerCollection = mongoose.model("customers", customerSchema)

module.exports = customerCollection;