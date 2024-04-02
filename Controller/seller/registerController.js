const sellerCollection = require('../../models/sellerModel');

const handleRegisterSeller = async (req, res) => {
    try {
        const body = req.body;
        // if data is missing
        if (!body.sellerName || !body.email || !body.password || !body.phoneNumber || !body.building || !body.landmark || !body.area || !body.district || !body.state){
            return res.json({ status: "data missing" });
        }

        // if user already registered
        const found = await sellerCollection.findOne({ email: body.email })
        if (found) {
            return res.json({ status: "exist" })
        }
        
        const newSeller = {
            name: body.sellerName,
            email: body.email,
            password: body.password,
            phoneNumber: body.phoneNumber,
            building: body.building,
            landmark: body.landmark,
            area: body.area,
            district: body.district,
            state: body.state,
        }

        await sellerCollection.insertMany([newSeller])
        const sellerDetails = await sellerCollection.findOne({ email: body.email })
        res.json({ status: "added", user: sellerDetails });
    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}

module.exports = { handleRegisterSeller };