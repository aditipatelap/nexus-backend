const customerCollection = require('../../models/customerModel');

const handleLoginCustomer = async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundCustomer = await customerCollection.findOne({ email: email })
        
        if (!foundCustomer) {
            // if customer is not found
            return res.json({ status: "notexist" })
        }

        // if exits the evaluate password 
        const match = foundCustomer.password === password ? true : false;

        if(!match) {
            // password not match
            return res.json({ status: "incorrect" });
        }

        res.json({ status: "success", user: foundCustomer });
        
    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}


module.exports = { handleLoginCustomer };