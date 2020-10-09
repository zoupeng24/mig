// 数据可视化

const start = function(data, port=1224){
    var template = require("art-template");
    const http = require('http');
    http.createServer(function (req, res) {
        var html = template(__dirname + '/temp.html', data);
        res.write(html);
    }).listen(port);
    
    console.log('数据分析成功, http://127.0.0.1:'+port)
    const url = 'http://127.0.0.1:'+port;
    const open = require('open');
    open(url, "chrome");
}

module.exports = {
    showPath: function(files, packageJSON){
        start({files, packageJSON})
    }
}