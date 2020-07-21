// 根据入口分析文件依赖的 

const copyFile = require('./util/copyFile');
const getDependance = require('./util/getDependance');
const { getNpmDep } = require('./util/getNpmDep');
const run = require('./output/run');

// 处理NPM
async function dealNpm(dependance, projectPath){
    const filePath = projectPath + '/package.json';
    getNpmDep({filePath: filePath, targets: dependance.npmList}).then((result)=>{
        run.showFilesAndNpm({
            files: dependance.relativeList,
            packageJSON: result
        })
    }, (e) => {
        console.log('分析package.json出错', e)
    })
}


// 复制文件
function dealCopy(){
    dependance.relativeList.forEach((element) => {
        const target = element.replace(projectPath, './__Mig/')
        copyFile(element, target)
    });
    console.log(`已成功复制了${dependance.relativeList.length}个文件到当前__Mig文件夹中.`)
}

async function main({projectPath, entryPath, shouldCopy=false}){
    const dependance = getDependance(entryPath)
    console.log(`该入口依赖了${dependance.relativeList.length}个文件,${dependance.npmList.length}个NPM包.`);
    
    shouldCopy && dealCopy();

    if(dependance.npmList.length > 0){
        dealNpm(dependance, projectPath);
    } else {
        run.showFiles({files: dependance.relativeList})
    }
}

module.exports = main;