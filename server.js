// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        console.log('User:', msg);

        // Send user message back to themselves
        socket.emit('chat message', `You: ${msg}`);

        // Bot logic (simple keyword replies)
        let botReply = "I'm not sure I understand.";

        if (msg.toLowerCase().includes("hello")) {
            botReply = "Hi there! How can I help you today?";
        } else if (msg.toLowerCase().includes("bye")) {
            botReply = "Goodbye! Have a nice day!";
        } else if (msg.toLowerCase().includes("time")) {
            botReply = `The current time is ${new Date().toLocaleTimeString()}`;
        }

        // Respond as bot
        setTimeout(() => {
            socket.emit('chat message', `Bot: ${botReply}`);
        }, 500); // Delay for realism
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Chatbot server running at http://localhost:${PORT}`);
});
