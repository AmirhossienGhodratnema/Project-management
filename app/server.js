const cookieParser = require('cookie-parser');


// My require
const { route: ApiRoute } = require('./router/api/index');
const { errorHandler, notFoundError } = require('./errors/errorHandlers');
const { AllRoutes } = require('./router/web/router');

module.exports = class Application {

    #express = require('express');    // Require express private.
    #app = this.#express();    // Get app in express and private.

    constructor(PORT, DB_URL) {
        this.configDatabase(DB_URL);    // Configuration DB.
        this.confiApplication();    // Configuration application.
        this.createServer(PORT);    // Create server.
        this.createRoute();    // Create routes
        this.errorHandler();    // Error handlers.
    };

    //  Server configuration
    confiApplication() {
        const path = require('path');

        // Opitons config.
        this.#app.use(this.#express.json())    // Json body-parser setting.
        this.#app.use(this.#express.urlencoded({ extended: true }));    // urlencoded body-parser setting.
        this.#app.use(this.#express.static(path.join(__dirname, './public')));    // Set static files.
        this.#app.use(cookieParser(process.env.SECRET_KEY_COOKIE_PARSER));    // Set cookie-parser and secret-key. 

        // View engine config. 
        this.#app.set('view engine', 'ejs');    // Set view engine,
        this.#app.set('views', path.join(__dirname, 'views'));    // Set dir view file.
    };

    // Create server
    createServer(PORT) {
        const http = require('http');
        const server = http.createServer(this.#app);    // Create server.
        server.listen(PORT, console.log(`Running server on port ${PORT}...`))    // Runnin server.
    };

    // Connect to DB.
    configDatabase(DB_URL) {
        const { mongoose } = require('mongoose');
        mongoose.connect(DB_URL, console.log(`Connect db successfull to: ${process.env.DB_CONNECT}...`));    // Connect to mongodb.
    };

    // Create route to web and api.
    createRoute() {
        this.#app.use(ApiRoute);    // Set api route.
        this.#app.use(AllRoutes);    // Set web route.
    };

    // Error handler full.
    errorHandler() {
        this.#app.use(notFoundError)    // Not found error (404) handler.
        this.#app.use(errorHandler)    // Errorhandler all errors.

    };
}


