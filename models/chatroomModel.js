const mongoose = require('mongoose');
// const slugify = require('slugify');

const chatroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Chatroom name is required'],
        unique: true,
        maxlength: 15,
    },
    users: {
        type: [String],
        required: [true, 'Must have bind at least one person to room'],
    },
    owner: {
        type: String,
        required: [true, 'Set owner to the room'],
        maxlength: 15,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
});

module.exports = mongoose.model('Chatroom', chatroomSchema);
