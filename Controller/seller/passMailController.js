const nodemailer = require('nodemailer');

const handleSendMail = async (email, password) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'acode4all@gmail.com', // Your Gmail email address
                pass: 'rhxw bfej fbkf mxdx' // Your Gmail password
            }
        });

        const mailOptions = {
            from: 'acode4all@gmail.com',
            to: email,
            subject: 'Your Login Credentials - NEXUS',
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
                            
                            h1 {
                                color: #333;
                                font-size: 24px;
                                margin-bottom: 20px;
                            }
                            p {
                                color: #555;
                                font-size: 16px;
                                margin-bottom: 10px;
                            }
                            .signature {
                                font-style: italic;
                                color: #777;
                                margin-top: 20px;
                            }
                        </style>
                    </head>
                    <body class="email-body">
                        <div class="email-heading">Dear Seller,</div>
                        <p>Your login details for Nexus are:</p>
                        <p>Email: ${email}</p>
                        <p>Password: ${password}</p>
                        <p>Please keep this information secure.</p>
                        <p class="signature">Best regards,<br/>Team Nexus</p>
                    </body>
                </html>
            `
        };

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
