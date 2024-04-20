const nodemailer = require('nodemailer');
const customerCollection = require('../../models/customerModel');

const handleSendMail = async (customerId, productName, update) => {
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
                html: `
                    <html>
                        <head>
                            <style>
                                /* Define your CSS styles here */
                                .email-body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    padding: 20px;
                                    border-radius: 5px;
                                }
                                .email-heading {
                                    font-size: 20px;
                                    color: #333;
                                    margin-bottom: 10px;
                                }
                                .email-text {
                                    font-size: 16px;
                                    color: #555;
                                }
                                .email-signature {
                                    font-style: italic;
                                    color: #777;
                                }
                            </style>
                        </head>
                        <body class="email-body">
                            <div class="email-heading">Dear Customer,</div>
                            <div class="email-text">
                                Your order with product <strong>${productName}</strong> has been approved.<br><br>
                                Thank you for shopping with us!<br><br>
                                <span class="email-signature">Best regards,<br>Team Nexus</span>
                            </div>
                        </body>
                    </html>
                `
            };
        } else if (update === 'rejected') {
            mailOptions = {
                from: 'acode4all@gmail.com',
                to: mailId,
                subject: 'Product Rejection Notification',
                html: `
                    <html>
                        <head>
                            <style>
                                /* Define your CSS styles here */
                                .email-body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    padding: 20px;
                                    border-radius: 5px;
                                }
                                .email-heading {
                                    font-size: 20px;
                                    color: #333;
                                    margin-bottom: 10px;
                                }
                                .email-text {
                                    font-size: 16px;
                                    color: #555;
                                }
                                .email-signature {
                                    font-style: italic;
                                    color: #777;
                                }
                            </style>
                        </head>
                        <body class="email-body">
                            <div class="email-heading">Dear Customer,</div>
                            <div class="email-text">
                                We regret to inform you that your order with product <strong>${productName}</strong> has been rejected.<br><br>
                                Please feel free to contact us for further assistance.<br><br>
                                <span class="email-signature">Best regards,<br>Team Nexus</span>
                            </div>
                        </body>
                    </html>
                `
            };
        } else if (update === 'delivered') {
            mailOptions = {
                from: 'acode4all@gmail.com',
                to: mailId,
                subject: 'Product Delivery Notification',
                html: `
                    <html>
                        <head>
                            <style>
                                /* Define your CSS styles here */
                                .email-body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    padding: 20px;
                                    border-radius: 5px;
                                }
                                .email-heading {
                                    font-size: 20px;
                                    color: #333;
                                    margin-bottom: 10px;
                                }
                                .email-text {
                                    font-size: 16px;
                                    color: #555;
                                }
                                .email-signature {
                                    font-style: italic;
                                    color: #777;
                                }
                            </style>
                        </head>
                        <body class="email-body">
                            <div class="email-heading">Dear Customer,</div>
                            <div class="email-text">
                                Your order with product <strong>${productName}</strong> has been delivered.<br><br>
                                We hope you enjoy your purchase!<br><br>
                                <span class="email-signature">Best regards,<br>Team Nexus</span>
                            </div>
                        </body>
                    </html>
                `
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
