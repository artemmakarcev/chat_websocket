const WS_URL = "ws://127.0.0.1:8000";

function createClient(panelId) {
  const chatEl = document.getElementById(`${panelId}-chat`);
  const formEl = document.getElementById(`${panelId}-form`);

  const appendMessage = (name, message) => {
    const messageEl = document.createElement("div");
    messageEl.className = "chat-message";
    messageEl.appendChild(document.createTextNode(`${name}: ${message}`));
    chatEl.appendChild(messageEl);
    chatEl.scrollTop = chatEl.scrollHeight;
  };

  const ws = new WebSocket(WS_URL);

  ws.onmessage = (message) => {
    const messages = JSON.parse(message.data);
    messages.forEach((value) => appendMessage(value.name, value.message));
  };

  ws.onopen = () => {
    console.log(`${panelId}: ws open`);
  };

  ws.onclose = () => {
    console.log(`${panelId}: ws close`);
  };

  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = formEl.name.value;
    const message = formEl.message.value;
    ws.send(JSON.stringify({ name, message }));
    formEl.message.value = "";
  });
}

createClient("client1");
createClient("client2");
