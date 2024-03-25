const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://nexus:ZTC7kjC43MnYuMLc@cluster0.qedsvam.mongodb.net/nexus?retryWrites=true&w=majority")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log('failed');
    })




const collection = mongoose.model("collection", newSchema)

module.exports = collection