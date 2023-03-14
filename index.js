const dotenv = require('dotenv');
const path = require('path');


// My require
const Application = require('./app/server');


// Check env file and select.
dotenv.config();
const nodeEnv = process.env.NODE_ENV;    // Check development or production.
dotenv.config({ path: path.join(__dirname, `.${nodeEnv}.env`) })    // Select to file env.


new Application(process.env.PORT, process.env.DB_URL);    // Create application.