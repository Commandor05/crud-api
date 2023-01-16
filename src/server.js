import http from 'http';
import cluster from 'cluster';
import os from 'os';
import 'dotenv/config';

const DEFAULT_API_PORT = 5001;

const hostname = '127.0.0.1'
const port = process.env.API_PORT || DEFAULT_API_PORT;
const pid = process.pid;

if (cluster.isPrimary) {
  const count = os.cpus().length;
  console.log(`Primary pid: ${pid}`);
  for (let i = 0; i < count; i += 1) {
    cluster.fork();
  } 
} else {
  const id = cluster.worker.id;
  console.log(`Worker: ${id}, pid: ${pid}, port: ${port}`)
  const server = http.createServer((req, res) => {
    // todo: add data poccessing
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Process-Id', pid)
    res.end('DATA');
  });
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
  });
  
  server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  });
  
  server.on('error', err => {
    if (err.code === 'EACCES') {
      console.log(`No access to port: ${port}`);
    }
  });
}


