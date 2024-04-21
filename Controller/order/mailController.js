const nodemailer = require('nodemailer');
const customerCollection = require('../../models/customerModel');
const { createInvoiceData } = require('../../invoice/invoiceData');

const handleSendMail = async (orderId, customerId, productId, productName, update) => {
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
                                Congratulations!<br>
                                Your order with product <strong>${productName}</strong> has been approved and is now out for delivery.<br>
                                Our delivery agent will be arriving shortly with your package. Upon delivery, you will receive your invoice.<br><br>
                                Thank you for shopping with us! We truly appreciate your trust and support.<br><br>
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
                                We regret to inform you that your order with product <strong>${productName}</strong> has been rejected by the seller.<br><br>
                                Please feel free to contact us for further assistance.<br><br>
                                <span class="email-signature">Best regards,<br>Team Nexus</span>
                            </div>
                        </body>
                    </html>
                `
            };
        } else if (update === 'delivered') {

            // Call createInvoiceData.js to generate invoice PDF
            await createInvoiceData(orderId, productId);

            // Generate invoice PDF
            const invoicePath = 'D:/NEXUS/nexus-backend/invoice/invoice.pdf';
            
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
                                Congratulations!<br>
                                Your order with product <strong>${productName}</strong> has been delivered.<br>
                                Additionally, we have attached the invoice here for your reference.<br><br>
                                We hope you enjoy your purchase!<br><br>
                                <span class="email-signature">Best regards,<br>Team Nexus</span>
                            </div>
                        </body>
                    </html>
                `,
                attachments: [{
                    filename: 'invoice.pdf',
                    path: invoicePath // Path to the generated invoice PDF
                }]
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
