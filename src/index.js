
exports.init = function({path, dirname}){

    let fs = require('fs');
    // const DIR = '/Users/zoupeng/workspace/git/weitech/wubaCunzhen/';
    const DIR = `${path.split(dirname)[0]}${dirname}/`;
    // let stream = fs.createReadStream(`${DIR}dist/salary_resume_post_Analyze.json`)
    let stream = fs.createReadStream(path);
    const util = require('./util.js');
    const display = require('./display.js');
    const npmParser = require('./npm.js');
    const { copyFile } = require('./copy.js');

    let data = '';
    stream.on('data', function (chrunk) {
        data += chrunk;
    });
    stream.on('end', function () {
        const result = JSON.parse(data);
        const modules = result.chunks[0].modules;
        const {npm_modules, self_modules} = util.split(modules)

        // 反向分析npm
        npmParser.parse(npm_modules, DIR).then(function(packageJSON){
            // 显示目录数据
            const pathData = util.pathJoin(self_modules);
            display.showPath(pathData.sort(), packageJSON)
            
            // 复制文件
            pathData.forEach((element, index) => {
                const url = element.substring(2, element.length);
                // TODO 不换号动态输出百分比进度
                // console.log(`${index+1}/${pathData.length}`)
                copyFile(DIR + url, 'Mig/' + url)
            });
            console.log('代码结构复制成功')
        })

    });
}