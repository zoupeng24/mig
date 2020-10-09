const main = require('./main')

exports.show = ({projectPath, entryPath}) => {
    main({projectPath, entryPath})
}

exports.copy = ({projectPath, entryPath}) => {
    main({projectPath, entryPath, shouldCopy: true})
}

