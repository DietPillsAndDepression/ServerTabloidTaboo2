// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework

var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {

    var filePath = '.' + request.url;

    if (filePath == './') {
        filePath = './index.html';
        console.log(request.socket.remoteAddress);
    }

    else if (filePath == './time') {
        let date_ob = new Date();
        response.end(date_ob.toString());
    }

    else {
        response.end("");
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
