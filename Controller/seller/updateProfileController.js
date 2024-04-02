const sellerCollection = require('../../models/sellerModel');

const handleUpdateSellerProfile = async (req, res) => {
    try {
        const body = req.body;
        
        // if data is missing
        if (!body.sellerName || !body.email || !body.password || !body.phoneNumber || !body.building || !body.landmark || !body.area || !body.district || !body.state){
            return res.json({ status: "data missing" });
        }
        
        const updateSeller = {
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
        
        const filter = { email: body.email };
        const found = await sellerCollection.findOne({ email: body.email })

        if (!found) {
            return res.json({ status: "notexist" })
        }

        await sellerCollection.updateOne(filter, updateSeller);
        const sellerDetails = await sellerCollection.findOne({ email: body.email })
        res.json({ status: "updated", user: sellerDetails });

    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}

module.exports = { handleUpdateSellerProfile };