const sellerCollection = require('../../models/sellerModel');

const handleLoginSeller = async (req, res) => {
    const { email, password } = req.body;
    try {
        const found = await sellerCollection.findOne({ email: email })
        
        if (!found) {
            // if seller is not found
            return res.json({ status: "notexist" })
        }

        // if exits the evaluate password 
        const match = found.password === password ? true : false;

        if(!match) {
            // password not match
            return res.json({ status: "incorrect" });
        }

        res.json({ status: "success", user: found });
        
    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}


module.exports = { handleLoginSeller };