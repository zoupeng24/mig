// 将import路径省略的后缀补全
const getImportFileSuffix = function(path){
    try {
        var fs = require("fs");
        // 如果文件存在
        if(fs.existsSync(`${path}`)) {
            // 如果是文件夹
            var stat = fs.lstatSync(path);
            if (stat.isDirectory()) {
                if(fs.existsSync(`${path}/index.js`)) {
                    return `${path}/index.js`
                } else {
                    return null;
                }
            } else {
                return path
            }
        } else if(fs.existsSync(`${path}.js`)) {
            return `${path}.js`
        } else {
            return null
        }
    } catch(e) {
        return null;
    }
}

module.exports = getImportFileSuffix;