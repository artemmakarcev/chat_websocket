const chatEl = document.getElementById("chat");
const formEl = document.getElementById("messageForm");

const ws = new WebSocket("ws://127.0.0.1:8000");
ws.onmessage = (message) => {};

const send = (event) => {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;
  ws.send(
    JSON.stringify({
      name,
      message,
    })
  );
};
formEl.addEventListener("submit", send);
