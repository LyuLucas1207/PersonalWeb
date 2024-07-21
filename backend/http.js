const http = require('http');
const fs = require('fs');
const path = require('path');

// function extensionType(filePath) {
//     const ext = path.extname(filePath);
//     switch (ext) {
//         case '.css':
//             return 'text/css';
//         case '.js':
//             return 'text/javascript';
//         case '.html':
//             return 'text/html';
//         // 为其他文件类型继续添加更多的case
//         default:
//             return 'text/plain';  // 为未知类型提供一个默认值
//     }
// }
const extensionType = (filePath) => {
    const ext = path.extname(filePath);
    switch (ext) {
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.html':
            return 'text/html';
        default:
            return 'text/plain'; // 提供默认值
    }
}


const server = http.createServer((req, res) => {
    let url = req.url;
    if (url === '/') {
        url = '/html/test.html';
    }
    console.log('Requested URL:', url);
    const baseDir = path.join(__dirname, '../');
    let filePath = path.join(baseDir, url);
    const contentType = extensionType(filePath);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

server.listen(5500, () => {
    console.log('Server is running at http://localhost:5500');
});
