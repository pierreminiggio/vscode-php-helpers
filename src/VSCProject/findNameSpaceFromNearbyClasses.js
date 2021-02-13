const fs = require('fs')
const path = require('path')
const pathSeparator = path.sep
const readStringFromFilePath = require('./readStringFromFilePath.js')

/**
 * @param {string} rootFolder 
 * @param {string} clickedFolder 
 * 
 * @returns {Promise<?string>}
 */
module.exports = (rootFolder, clickedFolder) => {
    return new Promise(async resolve => {
        const rootPath = path.normalize(rootFolder.substr(1))
        const folderPath = path.normalize(rootFolder.substr(1) + clickedFolder)
        const diff = folderPath.substr(rootPath.length)
        
        const folders = [rootPath]
        diff.split(pathSeparator).forEach(folder => {
            
            if (folder === '') {
                return
            }

            folders.push(folders[folders.length - 1] + pathSeparator + folder)
        })

        const foldersToCheck = folders.reverse()

        for (const folderKey in foldersToCheck) {
            const folderToCheck = foldersToCheck[folderKey]
            const phpFiles = fs.readdirSync(folderToCheck, {encoding: 'utf8'}).filter(file => file.substr(-4) === '.php')

            for (const phpFileIndex in phpFiles) {
                console.log(folderToCheck + pathSeparator + phpFiles[phpFileIndex])
                const fileContent = await readStringFromFilePath(folderToCheck + pathSeparator + phpFiles[phpFileIndex])
                const splitOnNameSpace = fileContent.split('namespace')

                if (splitOnNameSpace.length === 1) {
                    continue
                }

                resolve(splitOnNameSpace[1].split(';')[0].trim())
            }
        }
        
        resolve(null)
    })
    
}
