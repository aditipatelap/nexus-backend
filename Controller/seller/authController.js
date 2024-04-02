const sellerCollection = require('../../models/sellerModel');

const handleNewSeller = async (req, res) => {
    const { email } = req.body;
    try {
        const found = await sellerCollection.findOne({ email: email })
        if (found) {
            return res.json({ status: "exist" })
        }
        res.json({ status: "notexist" })
    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}


module.exports = { handleNewSeller };