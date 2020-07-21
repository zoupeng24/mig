
/* 
 * 基于webpack-bundle-analyzer产物文件进行分析，
 * 展示依赖的代码&npm包，并按照目录结构将其自动复制出来
 * webpack-bundle-analyzer 经测试版本: 2.11.3
 */

exports.init = function({projectPath, analyzePath}){

    let fs = require('fs');
    let stream = fs.createReadStream(analyzePath);
    const util = require('./util.js');
    const display = require('./display.js');
    const npmParser = require('./npm.js');
    const copyFile = require('../util/copyFile.js');
    const {CopyTarget} = require('../config/defaultConfig');

    let data = '';
    stream.on('data', function (chrunk) {
        data += chrunk;
    });
    stream.on('end', function () {
        const result = JSON.parse(data);
        console.log(`分析到${result.chunks.length}个chunks(代码块)`);
        let modules = [];
        result.chunks.forEach((item) => {
            modules = modules.concat(item.modules);
        })
        const {npm_modules, self_modules} = util.split(modules)

        // 反向分析npm
        npmParser.parse(npm_modules, projectPath).then(function(packageJSON){
            // 显示目录数据
            const pathData = util.pathJoin(self_modules);
            display.showPath(pathData.sort(), packageJSON)
            
            // 复制文件
            pathData.forEach((element, index) => {
                const url = element.substring(2, element.length);
                copyFile(projectPath + url, CopyTarget + url)
            });
            console.log('代码结构复制成功')
        })

    });
}