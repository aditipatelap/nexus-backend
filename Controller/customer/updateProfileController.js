const customerCollection = require('../../models/customerModel');

const handleUpdateCustomerProfile = async (req, res) => {
    try {
        const body = req.body;
        
        // if data is missing
        if (!body.firstName || !body.lastName || !body.email || !body.password || !body.phoneNumber || !body.gender || !body.birthday || !body.building || !body.landmark || !body.area || !body.district || !body.state){
            return res.json({ status: "data missing" });
        }
        
        const updateCustomer = {
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
        
        const filter = { email: body.email };
        const found = await customerCollection.findOne({ email: body.email })

        if (!found) {
            return res.json({ status: "notexist" })
        }

        await customerCollection.updateOne(filter, updateCustomer);
        const CustomerDetails = await customerCollection.findOne({ email: body.email })
        res.json({ status: "updated", user: CustomerDetails });

    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}

module.exports = { handleUpdateCustomerProfile };