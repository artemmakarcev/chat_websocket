const chatEl = document.getElementById("chat");
const formEl = document.getElementById("messageForm");

const ws = new WebSocket("ws://127.0.0.1:8000");
ws.onmessage = (message) => {
  console.log(JSON.parse(message.data));
  const messages = JSON.parse(message.data);
  messages.forEach((value) => {
    const messageEl = document.createElement("div");
    messageEl.appendChild(document.createTextNode(`${value.name}: ${value.message}`));
    chatEl.appendChild(messageEl);
  });
};
ws.onopen = ()=>{
  console.log('ws open')
}
ws.onclose = () => {
  console.log('ws close')
};

const send = (event) => {
  event.preventDefault();
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
