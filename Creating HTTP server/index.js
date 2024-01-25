const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New Req Received\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("Hello from Server");
        break;
      case "/about":
        res.end("I am Mehul Lodha");
        break;
      default:
        res.end("404 Not Found")
    }
  });
});

myServer.listen(8000, () => console.log("Server Started"));
