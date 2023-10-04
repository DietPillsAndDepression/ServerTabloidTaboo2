// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework

var http = require('http');
var fs = require('fs');
var path = require('path');
var childprocess = require("child_process");

http.createServer(function (request, response) {

    var filePath = '.' + request.url;

    if (filePath == './') {
        filePath = './index.html';
        console.log(request.socket.remoteAddress);
    }

    else if (filePath == './time') {
        let date_ob = new Date();
        response.end(date_ob.toString());
        return;
    }

    else if (filePath.startsWith("./?")) {
        let cmd = filePath.slice(3);
        cmd = cmd.replaceAll("%20", " ");
        console.log("command: "+cmd);
        cmd = childprocess.spawn(cmd,{shell: true});
        cmd.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            response.writeHead(`${data}`);
        });
        return;
    }

    else {
        response.write("Running script\n\n");
        let cmd = filePath.slice(2);
