// 获取npm依赖的版本

// 根据路径URL提取NPM包名
exports.parseNpmName = (urls) => {
    const names = [];
    try {
        urls.forEach(element => {
         const str = element.name.replace(/\.\/node_modules\//, '');
         const end = str.indexOf('/');
         const name = str.slice(0, end);
         if(names.indexOf(name) == -1){
             names.push(name)
         }
     });
    } catch (e) {
     console.log(e)
    }
};

// 根据NPM包名
exports.getNpmDep = ({filePath, targets}) => {
    return new Promise(function(resolve, reject){
       try{
            let fs = require('fs');
            let stream = fs.createReadStream(filePath)
            let data = '';
            stream.on('data', function (chrunk) {
                data += chrunk;
            });
            stream.on('end', function () {
                const packageJSON = JSON.parse(data);
                let result = {
                    devDependencies: {},
                    dependencies: {}
                }
                targets.forEach(function(item){
                    if(packageJSON.devDependencies[item]) {
                        result.devDependencies[item] = packageJSON.devDependencies[item]
                    } else if (packageJSON.dependencies[item]) {
                        result.dependencies[item] = packageJSON.dependencies[item]
                    }
                })
                resolve(result)
            });
       } catch(e){
           reject(e)
       }
    })
}
