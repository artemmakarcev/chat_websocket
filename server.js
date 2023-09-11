import { WebSocket } from "ws";
import { v4 as uuid } from "uuid";
const clients = {};

const wss = new WebSocket({ port: 8000 });
wss.on("connection", (ws) => {
  const id = uuid();
  clients[id] = ws;

  console.log("New client", id);

  ws.on("message", (rawMessage) => {
    console.log(rawMessage.data)
  });
  ws.on("close", () => {
    delete clients[id];
    console.log("client is closed", id);
  });
});
