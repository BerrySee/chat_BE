require('dotenv').config();

const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose Connection ERROR: ${err.message}`);
});

mongoose.connection.once('open', () => {
    console.log('MongoDB Connected!');
});

//Bring in the models
// require('./models/userModel');
require('./models/chatroomModel');
require('./models/messageModel');

const app = require('./app');

const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
