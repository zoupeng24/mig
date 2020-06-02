module.exports = {
    // 区分 node_modules
    split: function (modules) {
        const npm_modules = [];
        const self_modules = [];
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
            i.depth && result.push(i.name)
        })
        return result;
    },
}
