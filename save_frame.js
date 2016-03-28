
var http = require("http");
var io = require('socket.io').listen(server);
var fs = require('fs');
var server = http.createServer(function(request, response){});
io.sockets.on('connection', function (socket) {

    socket.on('render-frame', function (data) {

        data.file = data.file.split(',')[1]; // Get rid of the data:image/png;base64 at the beginning of the file data
        var buffer = new Buffer(data.file, 'base64');
        var gif_path=data.path;
        console.log("frame was saved here:" + gif_path+'/frame-' + data.frame + '.png');
        if (!fs.existsSync(data.path)){
          fs.mkdirSync(data.path);
        }
        fs.writeFile(gif_path+'/frame-' + data.frame + '.png', buffer.toString('binary'), 'binary');
      });

  });

server.listen(3030);
io.listen(server);
console.log('waiting for images...');
