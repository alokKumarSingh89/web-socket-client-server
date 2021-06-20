const url = "ws://localhost:9000"
const server = new WebSocket(url);


const messages = document.querySelector("#messages");
const input = document.querySelector("#message");
const buttons = document.querySelector("#send");

buttons.disabled = true;
buttons.addEventListener("click", sendMessage, false);

server.onopen = function () {
    buttons.disabled = false;
}

server.onmessage = function (event) {
    const { data } = event;
    generateMessageEntry(data, 'Server');
}

function generateMessageEntry(message, type) {
    const newMessage = document.createElement('p');
    newMessage.innerText = `${type}: ${message}`;
    messages.appendChild(newMessage);
}

function sendMessage() {
    const text = input.value
    server.send(text);
    generateMessageEntry(text,'Clients')
}