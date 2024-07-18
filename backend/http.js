const webhttp = require('http');

const sever = webhttp.createServer();
sever.on('request', (req, res) => {
    const url = req.url;
    const method = req.method;
    const str = `url: ${url}, method: ${method}`;
    console.log(str);
});

sever.listen(5500, () => {
    console.log('服务器启动成功，可以通过 http://127.0.0.1:5500/ 进行访问');
});