const WebSocket = require('ws');
const express = require('express');
const app = express();
const path = require('path');

app.use('/', express.static(path.resolve(__dirname, '../client')));

const server = app.listen(9000);

const wss = new WebSocket.Server({
    server
});
wss.on("connection", (ws) => {
    console.log("New Client Connected");
    ws.on("message", (data) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        })
    });
});


