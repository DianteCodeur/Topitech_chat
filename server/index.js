const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInChannel, listChannels, getMessagesInChannel } = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');
const { default: Message } = require('../client/src/components/Messages/Message/Message.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('join', ({ name, channel }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, channel });

        if (error) return callback (error);

        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the channel ${user.channel}`});
        socket.broadcoast.to(user.channel).emit('message', { user: 'admin', text: `${user.name}, has joined!`});

        io.to(listChannels.channel).emit('channelData', { channel: user.channel, users: listChannels(user.channel)});
        socket.join(user.channel);

        io.to(user.channel).emit('channelData', { channel: user.channel, users: getUsersInChannel(user.channel)});
        io.to(Message.channel).emit('channelData', { channel: Message.channel, users: getMessageInChannel(Message.channel)});

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.channel).emit('message', { user: user.name, text: message});
        io.to(user.channel).emit('channelData', { channel: user.channel, users: getUsersInChannel(user.channel)});
        io.to(Message.channel).emit('channelData', { channel: Message.channel, users: getMessageInChannel(Message.channel)});

        callback();
    });

    socket.on('disconnect', () => {
       const user = removeUser(socket.id);

       if(user){
        io.to(user.channel).emit('message', { user: user.name, text: `${user.name} has left.`})
       }
    })
});

app.use(router);
app.use(cors());

server.listen(PORT, () => console.log(`Le serveur est lancé sur ce port ${PORT}`));