'use strict';

const http = require('http');
const fs = require('fs');
const qstring = require('querystring'); // 将一个查询字符串转换为一个对象

const server = http.createServer((req, res) => {
    let url = req.url;
    let method = req.method;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if(url === '/' && method === 'GET') {
        fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(res);
    }else if (url === '/' && method === 'POST') {
        parsePostData(req, (data) => {
            console.log(data); // 输出请求对象
            res.end('post received');
        });
    };
});

server.listen(3000, '127.0.0.1', function() {
    console.log('server is listening at port 3000');
});

function parsePostData(req, callback) {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    });
    req.on('end', () => {
        // console.log('end');
        // let queryObj = qstring.parse(data);
        callback(data);
    })
}
