const main = require('./main')

exports.copy = ({projectPath, entryPath}) => {
    main({projectPath, entryPath, shouldCopy: true})
}

exports.show = ({projectPath, entryPath}) => {
    main({projectPath, entryPath})
}