require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/connectDB');
const PORT = process.env.PORT;

// connect to MongoDB
connectDB();

// custom middleware logger: it will log all requests which are coming
app.use(logger);

// third party middleware = cors(Cross Origin Resource Sharing)
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({extended: false, limit: '50mb'}));

// built-in middleware for json
app.use(express.json({limit: '50mb'}));

//routes
app.use('/customer', require('./Routes/customerRoute'));
app.use('/seller', require('./Routes/sellerRoute'));
app.use('/product', require('./Routes/productRoute'));

// error handler: if error occurs then it will be logged in error handler log file.
app.use(errorHandler);

mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
});
