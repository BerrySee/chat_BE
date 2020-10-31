const mongoose = require('mongoose');

const Chatroom = mongoose.model('Chatroom');
const sha256 = require('js-sha256');

exports.getRooms = async (req, res) => {
    try {
        const roomNames = [];
        const rooms = await Chatroom.find({});
        rooms.forEach((room) => {
            roomNames.push(room.name);
        });
        console.log(roomNames);
        res.status(201).json({
            status: 'success',
            data: {
                number: roomNames.length,
                rooms: roomNames,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'Fail',
            message: err,
        });
    }
};
exports.createRoom = async (req, res) => {
    try {
        const { name, owner, password } = req.body;
        console.log(req.body);
        const chatRoomExist = await Chatroom.findOne({
            name,
        });
        if (chatRoomExist) throw 'This chatroom already exist.';
        const newRoom = await Chatroom.create({
            name,
            owner,
            users: [owner],
            password: sha256(password + process.env.SALT),
        });
        res.status(201).json({
            status: 'success',
            message: 'The room is successfully created',
            data: {
                room: newRoom,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'Fail',
            message: err,
        });
    }
};

exports.joinRoom = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        const exist = await Chatroom.findOne({
            name,
            password: sha256(password + process.env.SALT),
        });
        console.log(exist);
        if (!exist) throw 'Chatroom name or password is incorrect';
        if (exist.users.includes(username)) throw 'This name is already used';
        await Chatroom.findOneAndUpdate(
            {
                name,
                password: sha256(password + process.env.SALT),
            },
            { $push: { users: username } }
        );
        const chatroom = await Chatroom.findOne({
            name,
        });

        res.status(201).json({
            status: 'success',
            data: {
                room: chatroom,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'Fail',
            message: err,
        });
    }
};

exports.leftRoom = async (req, res) => {
    try {
        const { name, username } = req.body;
        const room = await Chatroom.find({
            name,
        });
        // console.log(room[0].users);
        // if (room[0].users.length === 1) {
        //     await Chatroom.findOneAndDelete({
        //         name,
        //     });
        // } else {
        await Chatroom.findOneAndUpdate(
            {
                name,
            },
            { $pull: { users: username } }
        );
        // }

        res.status(201).json({
            status: 'success',
            message: 'User left the room',
        });
    } catch (err) {
        res.status(400).json({
            status: 'Fail',
            message: err,
        });
    }
};
