const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');


// My require
const { route: ApiRoute } = require('./router/api/index');
const { route: WebRoute } = require('./router/web/index');
const { errorHandler , notFoundError } = require('./errors/errorHandlers');


// Check env file and select.
dotenv.config()
const nodeEnv = process.env.NODE_ENV;    // Check development or production.
dotenv.config({ path: path.join(__dirname, `.${nodeEnv}.env`) })    // Select to file env.


// View engine config. 
app.set('view engine', 'ejs');    // Set view engine,
app.set('views', path.join(__dirname, 'views'));    // Set dir view file.


// Options
require('./dataBase/config/mongodb');
app.use(express.static('public'));    // Set static files.
app.use(cookieParser(process.env.SECRET_KEY_COOKIE_PARSER));    // Set cookie-parser and secret-key. 
app.use(express.json());    // Json body-parser setting.
app.use(express.urlencoded({ extended: true }));    // urlencoded body-parser setting.


// Router
app.use(ApiRoute);    // Set api route.
app.use(WebRoute);    // Set web route.
app.use(notFoundError)    // Not found error (404) handler.
app.use(errorHandler)    // Errorhandler all errors.


// Create server port: (8000 => development) or (3000 => production)
app.listen(process.env.PORT, console.log(`Running server on port ${process.env.PORT}...`))