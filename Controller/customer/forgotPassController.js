const customerCollection = require('../../models/customerModel');
const passMailController = require('./passMailController');

const handleForgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const foundCustomer = await customerCollection.findOne({ email: email })
        
        if (!foundCustomer) {
            // if customer is not found
            return res.json({ status: "notexist" })
        }

        passMailController.handleSendMail(foundCustomer.email, foundCustomer.password);

        res.json({ status: "sent" });
        
    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}


module.exports = { handleForgotPassword };