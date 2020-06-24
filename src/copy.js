var fs=require("fs");

const writeFileRecursive = function(path, buffer, callback){
    let lastPath = path.substring(0, path.lastIndexOf("/"));
    fs.mkdir(lastPath, {recursive: true}, (err) => {
        if (err) return callback(err);
        fs.writeFile(path, buffer, function(err){
            if (err) return callback(err);
            return callback(null);
        });
    });
}

function copyFile(from, to){
    var fs = require('fs');
    fs.readFile(from, 'utf-8', function(err, data) {
        if (err) {
            console.log("读取失败");
        } else {
            writeFileRecursive(to, data, (err)=>{
                if(err) console.error(err);
                // console.info("write success");
            });
        }
    });
}

exports.copyFile = copyFile;