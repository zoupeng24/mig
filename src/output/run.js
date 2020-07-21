// 启动服务展示结果

const runServer = function({data, port=1337, tempURL}){
    var template = require("art-template");
    const http = require('http');
    http.createServer(function (req, res) {
        var html = template(tempURL, data);
        res.write(html);
    }).listen(port);
    
    console.log('依赖的数据分析成功, http://127.0.0.1:'+port)
    const url = 'http://127.0.0.1:'+port;
    const open = require('open');
    open(url, "chrome");
}

module.exports = {
    showFiles: function(files){
        runServer({
            data: files,
            tempURL: __dirname + '/templates/files.html'
        })
    },
    showFilesAndNpm: function({files, packageJSON}){
        runServer({
            data: {
                files,
                packageJSON,
            },
            tempURL: __dirname + '/templates/filesAndNpm.html'
        })
    }
}