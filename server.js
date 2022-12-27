const express = require('express');
const path = require('path')

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname + '/frontEnd')))

io.on('connection', socket => {
    socket.on('newuser', username => {
        socket.broadcast.emit('update', username + ' joined the conversation');
    });
    socket.on('exituser', username => {
        socket.broadcast.emit('update', username + ' left the conversation');
    });
    socket.on('chat', message => {
        socket.broadcast.emit('chat', message);
    });
});

// server.listen(3000);


server.listen(process.env.PORT || 3000, () => {
    console.log(`server is running at ${process.env.PORT || 3000}`);
})