const nodemailer = require('nodemailer');
const customerCollection = require('../../models/customerModel');

const handleSendMail = async (customerId, productId, update) => {
    try {
        // Fetch customer details using customerId
        const customer = await customerCollection.findOne({ _id: customerId });
        const mailId = customer.email;

        // Create a nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'acode4all@gmail.com', // Your Gmail email address
                pass: 'rhxw bfej fbkf mxdx' // Your Gmail password
            }
        });

        // Define email options based on the update value
        let mailOptions = {};
        if (update === 'approved') {
            mailOptions = {
                from: 'acode4all@gmail.com',
                to: mailId,
                subject: 'Product Approval Notification',
                text: `Dear Customer,\n\nYour order with product ID ${productId} has been approved.\n\nThank you for shopping with us!\n\nBest regards,\nYour Store Team`
            };
        } else if (update === 'rejected') {
            mailOptions = {
                from: 'acode4all@gmail.com',
                to: mailId,
                subject: 'Product Rejection Notification',
                text: `Dear Customer,\n\nWe regret to inform you that your order with product ID ${productId} has been rejected.\n\nPlease feel free to contact us for further assistance.\n\nBest regards,\nYour Store Team`
            };
        }

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

module.exports = { handleSendMail };