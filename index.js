#!/usr/bin/env node

process.title = 'mig';

const program = require('commander');
program
    .version('0.0.1', '-v, --version')
    .usage('<command> [options]')
    .option('-bc, --bundleCopy <path>:<dirname>', '根据bundle-analyzer产物分析&复制', function(str){
        return {
            path: str.split(':')[0],
            dirname: str.split(':')[1]
        }
    })
    .parse(process.argv)

if (program.bundleCopy) {
    const {bundleCopy} = program;
    const {init} = require('./src/bc/index.js');
    init(bundleCopy)
}

