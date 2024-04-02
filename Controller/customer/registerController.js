const customerCollection = require('../../models/customerModel');

const handleRegisterCustomer = async (req, res) => {
    try {
        const body = req.body;
        // if data is missing
        if (!body.firstName || !body.lastName || !body.email || !body.password || !body.phoneNumber || !body.gender || !body.birthday || !body.building || !body.landmark || !body.area || !body.district || !body.state){
            return res.json({ status: "data missing" });
        }

        // if user already registered
        const found = await customerCollection.findOne({ email: body.email })
        if (found) {
            return res.json({ status: "exist" })
        }
        
        const newCustomer = {
            profilePic: body.profilePic,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
            phoneNumber: body.phoneNumber,
            gender: body.gender,
            birthday: body.birthday,
            building: body.building,
            landmark: body.landmark,
            area: body.area,
            district: body.district,
            state: body.state,
        }

        await customerCollection.insertMany([newCustomer])
        const customerDetails = await customerCollection.findOne({ email: body.email })
        res.json({ status: "added", user: customerDetails });
    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}

module.exports = { handleRegisterCustomer };