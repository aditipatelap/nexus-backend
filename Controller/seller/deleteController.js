const sellerCollection = require('../../models/sellerModel');

const handleDeleteSeller = async (req, res) => {
    const { email } = req.body;
    
    try {
        const found = await sellerCollection.findOne({ email: email })
        if (!found) {
            return res.json({ status: "notexist" })
        }
        await sellerCollection.deleteOne({ email: email });
        res.json({ status: "deleted" });
    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}

module.exports = { handleDeleteSeller };