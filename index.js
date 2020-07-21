#!/usr/bin/env node

process.title = 'mig';

const program = require('commander');
const talkParams = require('./src/util/talkParams.js');
program
    .version('2.0.1', '-v, --version')
    .usage('<command> [options]')
    .option('-c, --copy', '复制依赖所有文件')
    .option('-s, --show', '展示依赖所有文件')
    .option('-x, --config <configPath>', '通过配置文件使用工具', function(configPath){
        return configPath;
    })
    .option('-bc, --bundleCopy <path>:<dirname>', '根据bundle-analyzer产物分析&复制', function(str){
        return {
            path: str.split(':')[0],
            dirname: str.split(':')[1]
        }
    })
    .parse(process.argv)

// 复制依赖所有文件
if (program.copy) {
    talkParams().then(({projectPath, entryPath}) => {
        const {copy} = require('./src/init.js');
        copy({projectPath, entryPath})
    })
}

// 展示依赖所有文件
if (program.show) {
    talkParams().then(({projectPath, entryPath}) => {
        const {show} = require('./src/init.js');
        show({projectPath, entryPath})
    })
}

// 通过配置文件使用工具
if (program.config) {
    console.log('todo...')
    // const configPath = program.config;
    // const {runConfig} = require('./src/init.js');
    // runConfig(configPath)
}

// 基于webpack-bundle-analyzer产物文件进行分析
if (program.bundleCopy) {
    const {path, dirname} = program.bundleCopy;
    const {init} = require('./src/bc/index.js');
    init({path, dirname})
}

