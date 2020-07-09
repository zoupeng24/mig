// 根据属性去重
function filterByName(data, Name) { 
    let dest = [];
    for (let i = 0; i < data.length; i++) {
        let ai = data[i];
        if (i == 0) {
            dest.push(ai);
        } else {
            let filterData = dest.filter(function (e) {
                return e[Name] == ai[Name];
            })
            if (filterData.length == 0) {
                dest.push(ai);
            }
        }
    }
    return dest;
};

module.exports = {
    // 区分 node_modules
    split: function (modules) {
        const npm_modules = [];
        const self_modules = [];
        modules = filterByName(modules, 'name');
        modules.forEach((item) => {
            if ((new RegExp(/node_modules/)).test(item.name)) {
                npm_modules.push(item)
            } else {
                self_modules.push(item)
            }
        })
        return {npm_modules, self_modules}
    },
    // 区分级别
    levelo: function (list) {
        const result = []
        list.forEach((i) => {
            if (result[i.depth] && result[i.depth].length > 0) {
                result[i.depth].push(i)
            } else {
                result[i.depth] = [i]
            }
        })
        return result;
    },
    // 按照路径整合
    pathJoin: function (list) {
        const result = []
        list.forEach((i) => {
            // 是否为入口模块
            const isRootModule = i.depth === 0;
            // 是否为相对地址模块(项目内自己编写的已./开头)
            const isRelativeModule = i.name.indexOf('./') === 0;
            
            if(!isRootModule && isRelativeModule) {
                result.push(i.name)
            }
        })
        return result;
    },
}
