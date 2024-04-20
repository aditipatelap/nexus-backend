const sellerCollection = require('../../models/sellerModel');
const passMailController = require('./passMailController');

const handleForgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const found = await sellerCollection.findOne({ email: email })
        
        if (!found) {
            // if seller is not found
            return res.json({ status: "notexist" })
        }

        passMailController.handleSendMail(found.email, found.password);

        res.json({ status: "sent" });
        
    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}

module.exports = { handleForgotPassword };