#!/usr/bin/env node

process.title = 'mig';

const program = require('commander');
const {talkParams, talkParamsForWebpack} = require('./src/util/talkParams.js');
const {show, copy} = require('./src/directives.js');

program
    .version('2.2.0', '-v, --version')
    .usage('<command> [options]')
    .option('-c, --copy', '复制依赖所有文件')
    .option('-s, --show', '展示依赖所有文件')
    .option('-w, --webpack', '根据webpack-bundle-analyzer产物复制')
    .parse(process.argv)

// 复制依赖所有文件
if (program.copy) {
    talkParams().then(({projectPath, entryPath}) => {
        copy({projectPath, entryPath})
    })
}

// 展示依赖所有文件
if (program.show) {
    talkParams().then(({projectPath, entryPath}) => {
        show({projectPath, entryPath})
    })
}


// 基于webpack-bundle-analyzer产物文件进行分析
if (program.webpack) {
    talkParamsForWebpack().then(({projectPath, analyzePath}) => {
        const {init} = require('./src/webpack/index.js');
        init({projectPath, analyzePath})
    })
}

