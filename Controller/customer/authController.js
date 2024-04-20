const customerCollection = require('../../models/customerModel');
const codeMailController = require('./codeMailController');

const handleNewCustomer = async (req, res) => {
    const { email } = req.body;
   
    try {
        const found = await customerCollection.findOne({ email: email })
        
        if (found) {
            return res.json({ status: "exist" })
        }

        // Generate a 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        // Send verification code via email
        await codeMailController.handleSendMail(email, verificationCode);

        res.json({ status: "notexist", code: verificationCode });
    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
    
}


module.exports = { handleNewCustomer };