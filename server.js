import { WebSocketServer } from "ws";
import { v4 as uuid } from "uuid";
import { writeFileSync, readFileSync, existsSync } from "fs";
const clients = {};
const logFile = existsSync("log.json") && readFileSync("log.json");
const messages = JSON.parse(logFile) || [];

const wss = new WebSocketServer({ port: 8000 });
wss.on("connection", (ws) => {
  const id = uuid();
  clients[id] = ws;

  console.log("New client", id);

  ws.send(JSON.stringify(messages));

  ws.on("message", (data, isBinary) => {
    console.log(JSON.parse(data), isBinary);
    const { name, message } = JSON.parse(data);
    messages.push({ name, message });
    for (const id in clients) {
      clients[id].send(JSON.stringify([{ name, message }]));
    }
  });
  ws.on("close", () => {
    delete clients[id];
    console.log("client is closed", id);
  });
  ws.on("error", console.error);
});

process.on("SIGINT", () => {
  wss.close();
  writeFileSync("log.json", JSON.stringify(messages), (err) => {
    if (err) {
      console.error(err);
    }
    console.log('file save')
  });
  process.exit();
});
