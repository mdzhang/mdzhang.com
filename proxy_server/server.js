// Load the http module to create an http server.
var http = require('http');
var request = require('request');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (req, res) {
  if(req.url.match(/path=(.*)/)) {
    res.setHeader("access-control-allow-origin", "*");
    request.get(req.url.match(/path=(.*)/)[1]).pipe(res);
  } else{
    res.statusCode = 404;
    res.end();
  }
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);