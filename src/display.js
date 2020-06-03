// 数据可视化

const start = function(data, port=1337){
    var template = require("art-template");
    const http = require('http');
    http.createServer(function (req, res) {
        var html = template(__dirname + '/temp.html', data);
        // console.log(html)
        res.write(html);
    }).listen(port);
    
    console.log('数据分析成功, http://127.0.0.1:'+port)
    const url = 'http://127.0.0.1:'+port;
    const open = require('open');
    open(url, "chrome");
}

module.exports = {
    // showLevel: function(data){
    //     temp(function(res){
    //         res.write('<ul>');
    //         for(let i=0;i<data.length;i++){
    //             res.write(`<li><span>Level:${data[i][0].depth}</span>`);
    //             const item = data[i];
    //             for(let j=0;j<item.length;j++){
    //                 res.write(`<div>${item[j].name}</div>`);
    //             }
    //             res.write('</li>');
    //         }
    //         res.write('</ul>');
    //     })
    // },
    showPath: function(files, packageJSON){
        start({files, packageJSON})
    }
}