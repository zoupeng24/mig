// 复制文件，没有目录递归创建

var fs = require("fs");

// 强制写入文件
const writeFileRecursive = function(path, buffer, callback){
  let lastPath = path.substring(0, path.lastIndexOf("/"));
  mkdirSync(lastPath, function(){
      fs.writeFile(path, buffer, function(err){
          if (err) return callback(err);
          return callback(null);
      });
  })
}

// 递归创建目录
function mkdirSync(dir, cb) {
    let paths = dir.split('/');
    let index = 1;
  
    function next(index) {
      if (index > paths.length) return cb();
      let newPath = paths.slice(0, index).join('/');
      fs.stat(newPath, function (err) {
        if (err) {
          fs.mkdir(newPath, function (err) {
            next(index + 1);
          });
        } else {
          next(index + 1);
        }
      })
    }
    next(index);
}

// 复制文件
function copyFile(from, to){
    var fs = require('fs');
    fs.readFile(from, 'utf-8', function(err, data) {
        if (err) {
            console.log("文件读取失败,"+from);
        } else {
            writeFileRecursive(to, data, (err)=>{
                if(err) console.error(err);
            });
        }
    });
}

module.exports = copyFile;