#!/usr/bin/env node

process.title = 'mig';

const program = require('commander');
program
    .version('0.0.1', '-v, --version')
    .usage('<command> [options]')
    .option('-a, --analyze <path>:<dirname>', '分析', function(str){
        return {
            path: str.split(':')[0],
            dirname: str.split(':')[1]
        }
    })
    .parse(process.argv)

if (program.analyze) {
    const {analyze} = program;
    const {init} = require('./src/index.js');
    init(analyze)
}

// eg  文件路径:文件目录名
// /Users/wubaCunzhen/dist/a.json:wubaCunzhen

