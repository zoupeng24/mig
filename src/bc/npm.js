
module.exports = {
    parse: function(list, projectPath){
        const names = [];
        try {
         list.forEach(element => {
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
        return this.dealDir(names, projectPath)
    },
    dealDir: function(names, projectPath){
        return new Promise(function(resolve, reject){
            let fs = require('fs');
            let stream = fs.createReadStream(projectPath+'package.json')
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
                names.forEach(function(item){
                    if(packageJSON.devDependencies[item]) {
                        result.devDependencies[item] = packageJSON.devDependencies[item]
                    } else if (packageJSON.dependencies[item]) {
                        result.dependencies[item] = packageJSON.dependencies[item]
                    }
                })
                resolve(result)
            });
        })
    }
}