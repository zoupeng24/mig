## Mig(米格)
Migration(迁移)，迁移代码的工具.

> 俗话说：“开发程序就是Copy代码”，Mig帮你自动Copy需要的代码。

## 主要功能
* 分析一个或多个入口文件所依赖的所有文件
* 将依赖的文件和NPM包名&版本的数据可视化
* 将依赖的文件按原有路径自动复制
* 目前RN, React经过测试和实际运用

## 使用方法
#### 一、React-Native项目
1. npm install -g @w/mig --registry=http://cnpm.58v5.cn
2. mig -c

#### 二、wubaCunzhen项目
1. 在wubaCunzhen项目中执行 npm run dev --build=入口 --analyze (多个入口同时分析用逗号分开：入口1,入口2)
2. 会得到依赖分析的文件：./dist/入口_Analyze.json
3. npm install -g @w/mig --registry=http://cnpm.58v5.cn
4. mig -bc

#### 三、其他使用webpack打包的项目
因为Mig读取webpack配置相关工作待完善，所以结合webpack-bundle-analyzer和Mig来达到迁移目的。
1. 配置webpack-bundle-analyzer插件（详细请参考官网）
```
new BundleAnalyzerPlugin({
    generateStatsFile: true, // 文件形式
    statsFilename: 'ABC.json', // 文件名
    analyzerMode: 'disabled' // 不打开浏览器
})
```
2. 通过编译得到依赖分析的文件：./dist/ABC.json
3. npm install -g @w/mig --registry=http://cnpm.58v5.cn
4. mig -bc

