// 数据可视化

const temp = function(middle){
    const http = require('http');
    http.createServer(function (req, res) {
        res.write('<html><head><meta charset="utf-8"></head><body>');
        middle(res)
        res.end('</body></html>');
    }).listen(1337);
    
    console.log('数据分析成功, http://127.0.0.1:1337')
    const url = 'http://127.0.0.1:1337';
    const open = require('open');
    open(url, "chrome");
}

module.exports = {
    showLevel: function(data){
        temp(function(res){
            res.write('<ul>');
            for(let i=0;i<data.length;i++){
                res.write(`<li><span>Level:${data[i][0].depth}</span>`);
                const item = data[i];
                for(let j=0;j<item.length;j++){
                    res.write(`<div>${item[j].name}</div>`);
                }
                res.write('</li>');
            }
            res.write('</ul>');
        })
    },
    showPath: function(data){

        temp(function(res){
            res.write(`<h1>共依赖${data.length}个文件</h1>`);
            res.write('<ul>');

            for(let i=0;i<data.length;i++){
                res.write(`<li>${data[i]}</li>`);
            }
            res.write('</ul>');
        })
    }
}