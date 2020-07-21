/* 
 * 分析文件依赖列表
*/

const parser = require("@babel/parser")
const traverse = require("@babel/traverse")
const fs = require("fs");
const getImportFileSuffix = require('./getImportFileSuffix');
const Mig_Config = require('../config/defaultConfig')

const getDependanceList = function({result, entry_path, astConfig}){
    const data = fs.readFileSync(entry_path)
    const entry_str = data.toString();
    const ast = parser.parse(entry_str, astConfig)
    const visitor = {
        ImportDeclaration(path) {
            const {value} = path.node.source;
            // 判断是否有本地文件
            if (value[0] === '.') {
                const index = entry_path.lastIndexOf('/')
                const entryDirPath = entry_path.slice(0, index);
                const absolutePath = require('path').resolve(entryDirPath, value);
                const target = getImportFileSuffix(absolutePath)
                try{
                    if(result.relativeDep.indexOf(target) === -1 && target !== null){
                        result.relativeDep.push(target);    
                        if(typeof target === 'string') {
                            result = getDependanceList({
                                entry_path: target, 
                                result, 
                                astConfig,
                            })
                        }
                    }
                } catch(e){
                    console.log('分析依赖出错', e)
                }
            } else {
                if(result.npmDep.indexOf(value) === -1 && value !== null){
                    result.npmDep.push(value);    
                }
            }
        }
    }
    // 遍历
    traverse.default(ast, visitor)
    return result;
}

// 获取依赖
function getDependance(entryPath) {
    const entries = entryPath;

    const dependance = {
        relativeList: [],
        npmList: []
    };

    for(var i=0;i<entries.length;i++){
        const result = getDependanceList({
            result:{
                relativeDep: [],
                npmDep: []
            },
            entry_path: entries[i], 
            astConfig: Mig_Config.astConfig,
        });
        result.relativeDep.forEach((item) => {
            if(dependance.relativeList.indexOf(item) === -1){
                dependance.relativeList.push(item)
            }
        })
        result.npmDep.forEach((item) => {
            if(dependance.npmList.indexOf(item) === -1){
                dependance.npmList.push(item)
            }
        })
    }
    return dependance;
}

module.exports = getDependance;