const fs = require('fs')
const path = require('path')


/**
 * @param {string} rootFolder 
 * 
 * @returns {?string}
 */
module.exports = rootFolder => {
    
    const possibleComposerJsonFilePaths = [
        path.normalize(rootFolder.substr(1) + '/composer.json')
    ]

    let composerJsonFilePath = null

    possibleComposerJsonFilePaths.forEach(possibleComposerJsonFilePath => {
        if (fs.existsSync(possibleComposerJsonFilePath)) {
            composerJsonFilePath = possibleComposerJsonFilePath
        }
    })

    return composerJsonFilePath
}