'use strict';

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    let url = req.url;
    let method = req.method;

    if(url === '/' && method === 'GET') {
        fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(res);
    }else if (url === '/' && method === 'POST') {
        parsePostData(req, (data) => {
            console.log(data); // log request data
            res.end('post received');
        });
    };
});

server.listen(3000, '127.0.0.1', function() {
    console.log('server is listening @ port 3000');
});

function parsePostData(req, callback) {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    });
    req.on('end', () => {
        callback(data);
    })
}
