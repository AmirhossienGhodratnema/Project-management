const { mongoose } = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/Management';

// Connect to mongodb.
mongoose.connect(DB_URL, console.log('Connect to db...'));    