const nodemailer = require('nodemailer');

const handleSendMail = async (email, code) => {
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
            subject: 'Verification Code - NEXUS',
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
                                font-size: 20px;
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
                            .verification-code {
                                font-size: 24px;
                                font-weight: bold;
                                color: #007bff; /* Blue color */
                                margin-top: 20px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Dear Seller,</h1>
                            <p>Your verification code for Nexus is:</p>
                            <p class="verification-code">${code}</p>
                            <p>Please don't share code with anyone.</p>
                            <p class="signature">Best regards,<br/>Team Nexus</p>
                        </div>
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