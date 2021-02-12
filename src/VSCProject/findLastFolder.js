/**
 * @param {string} rootFolder 
 * @param {string} clickedPath 
 * 
 * @return {string}
 */
module.exports = (rootFolder, clickedPath) => {
    
    if (rootFolder === clickedPath) {
        return '/'
    }

    /** @type {string[]} */
    const relativeclickedPath = clickedPath.substr(rootFolder.length)
    const splitedRelativeclickedPath = relativeclickedPath.split('/')

    /** @type {string} */
    const lastFolderOrFile = splitedRelativeclickedPath[splitedRelativeclickedPath.length - 1]

    return lastFolderOrFile.includes('.') ? (
        splitedRelativeclickedPath.splice(
            0, splitedRelativeclickedPath.length - 1
        ).join('/') + '/'
    ) : (
        relativeclickedPath + '/'
    )
}