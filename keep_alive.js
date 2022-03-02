var http = require('http');

http.createServer(function (req, res) {
  res.write("No estaba muerto, estaba de parranda.");
  res.end();
}).listen(8080);