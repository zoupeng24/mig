module.exports = {
    parse: function(list, dir){
        const names = [];
        list.forEach(element => {
            const str = element.name.replace(/\.\/node_modules/, '');
            const name = str.match(/(?<=\/).*?(?=\/)/)[0]
            if(names.indexOf(name) == -1){
                names.push(name)
            }
        });
        return this.dealDir(names, dir)

    },
    dealDir: function(names, dir){
        return new Promise(function(resolve, reject){
            let fs = require('fs');
            let stream = fs.createReadStream(`${dir}package.json`)
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