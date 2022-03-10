/*
 * express 를 사용하지 않고 서버를 구동하는 가장 기본적인 형태의 코드
 * https://nodejs.org/download/release/v16.3.0/docs/api/synopsis.html
 */

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});