// 根据入口文件分析文件依赖

const copyFile = require('./util/copyFile');
const getDependance = require('./util/getDependance');
const { getNpmDep } = require('./util/getNpmDep');
const showTool = require('./output/show');

// 处理NPM
async function dealNpm(dependance, projectPath){
    const filePath = projectPath + '/package.json';
    getNpmDep({filePath: filePath, targets: dependance.npmList}).then((result)=>{
        showTool.showFilesAndNpm({
            files: dependance.relativeList,
            packageJSON: result
        })
    }, (e) => {
        console.log('分析package.json出错', e)
    })
}


// 复制文件
function dealCopy({projectPath,dependance}){
    const {CopyTarget} = require('./config/defaultConfig');
    dependance.relativeList.forEach((element) => {
        const target = element.replace(projectPath, CopyTarget)
        copyFile(element, target)
    });
    console.log(`已成功复制了${dependance.relativeList.length}个文件到${CopyTarget}文件夹中.`)
}

async function main({projectPath, entryPath, shouldCopy=false}){
    const dependance = getDependance(entryPath)
    console.log(`该入口依赖了${dependance.relativeList.length}个文件,${dependance.npmList.length}个NPM包.`);
    
    shouldCopy && dealCopy({projectPath, dependance});

    if(dependance.npmList.length > 0){
        dealNpm(dependance, projectPath);
    } else {
        showTool.showFiles({files: dependance.relativeList})
    }
}

module.exports = main;