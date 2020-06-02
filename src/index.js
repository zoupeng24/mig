let fs = require('fs');
const DIR = '/Users/zoupeng/workspace/git/weitech/wubaCunzhen/';
let stream = fs.createReadStream(`${DIR}dist/salary_resume_post_Analyze.json`)
const util = require('./util.js');
const display = require('./display.js');
const { copyFile } = require('./copy.js');


let data = '';
stream.on('data', function (chrunk) {// 将数据分为一块一块的传递
    data += chrunk;
});
stream.on('end', function () {
    const result = JSON.parse(data);
    const modules = result.chunks[0].modules;
    // console.log(modules.length);
    const {npm_modules, self_modules} = util.split(modules)

    // 反向分析npm
    // const npm_

    // 显示分级数据
    // const levelData = util.levelo(self_modules);
    // display.showLevel(levelData)

    // 显示目录数据
    const pathData = util.pathJoin(npm_modules);
    // const pathData = util.pathJoin(self_modules);
    display.showPath(pathData.sort())

    return;

    
    // 复制文件
    pathData.forEach((element, index) => {
        const url = element.substring(2, element.length);
        // console.log(`${index+1}/${pathData.length}`)
        copyFile(DIR + url, 'dist/' + url)
    });
    console.log('代码结构复制成功')
});
