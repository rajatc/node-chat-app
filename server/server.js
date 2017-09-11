const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server= http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newEmail', {
    //     from: "rajat@example.com",
    //     text: "Hey Wassup?",
    //     createdAt: 123
    // });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('CreateEmail', newEmail);
    // });

    // socket.emit('newMessage', {
    //     from: 'Arun',
    //     text: 'see you soon',
    //     createdAt: 123123
    // });

    socket.emit('newMessage', generateMessage("Admin", "Welcome to the Chat App"));

    socket.broadcast.emit('newMessage',  generateMessage("Admin", "New user joined"));

    socket.on('createMessage', (message, callback) => {
        console.log('Create message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
})

server.listen(port, () => {
    console.log(`Listening on port ${3000}`);
});