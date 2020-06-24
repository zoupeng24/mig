## Mig(米格)
Migration(迁移)，迁移代码的工具

## 介绍 
基于webpack-bundle-analyzer产物文件进行分析，展示依赖的代码&npm包，并按照目录结构将其自动复制出来

webpack-bundle-analyzer 经测试版本: ^2.11.3


## 用法(比如从wubaChunZhen项目迁移)
1. npm install -g @w/mig --registry=http://cnpm.58v5.cn
2. npm run dev --build=入口 --analyze
3. 会得到依赖分析的文件：./dist/入口_Analyze.json
4. mig -a 分析文件的绝对路径:项目根文件夹名，eg. ```sudo mig -a /workspace/wubaCunzhen/dist/入口_Analyze.json:wubaCunzhen```
5. 当前目录下会生成一个Mig文件夹，里面下会按照原路径产出所有依赖文件，并打开一个实例页面展示依赖的文件列表和依赖的npm包