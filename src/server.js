import http from "http";
import "dotenv/config";
import { router } from "./router/router.js";
import UsersStore from "./data/usersStore.js";

const DEFAULT_API_PORT = 5001;

const hostname = "localhost";
const port = parseInt(process.env.API_PORT) || DEFAULT_API_PORT;

new UsersStore();

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  router(req, res);
});

export const app = server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

server.on("clientError", (err, socket) => {
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});

server.on("error", (err) => {
  if (err.code === "EACCES") {
    console.log(`No access to port: ${port}`);
  }
});
