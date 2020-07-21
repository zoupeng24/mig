const inquirer = require('inquirer');

// 获取参数
exports.talkParams = async function (){
    const {projectPath} = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectPath',
            message: `请输入项目根文件夹的绝对路径:`
        }
    ]);
    if(projectPath[projectPath.length - 1] === '/'){
        projectPath.substring(0,projectPath.length-1)
    }
    const {entryList} = await inquirer.prompt([
        {
            type: 'input',
            name: 'entryList',
            message: `请输入入口文件的相对路径(多个用逗号分开):`
        }
    ]);
    const array = entryList.split(',');
    const entryPath = [];
    array.forEach(element => {
        if(element[0] !== '/'){
            element = '/' + element
        }
        entryPath.push(projectPath + element);
    });
    return {
        projectPath,
        entryPath,
    };
}

// 获取基于webpack-bundle-analyze方式的参数
exports.talkParamsForBC = async function(){
    const {analyzePath} = await inquirer.prompt([
        {
            type: 'input',
            name: 'analyzePath',
            message: `请输入webpack-bundle-analyze分析结果文件的绝对路径:`
        }
    ]);
    let {projectPath} = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectPath',
            message: `请输入项目根目录的绝对地址:`
        }
    ]);
    if(projectPath[projectPath.length-1] !== '/'){
        projectPath = projectPath + '/'
    }
    return {
        projectPath,
        analyzePath,
    };
}
