const customerCollection = require('../../models/customerModel');

const handleDeleteCustomer = async (req, res) => {
    const { email } = req.body;

    try {
        const foundCustomer = await customerCollection.findOne({ email: email })
        if (!foundCustomer) {
            return res.json({ status: "notexist" })
        }
        await customerCollection.deleteOne({ email: email });
        res.json({ status: "deleted" });
    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}

module.exports = { handleDeleteCustomer };