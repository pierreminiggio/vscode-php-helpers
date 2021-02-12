const path = require('path')

/**
 * @param {string} rootFolder 
 * @param {string} clickedFolder 
 * @param {string} className 
 * 
 * @returns {string}
 */
module.exports = (rootFolder, clickedFolder, className) => {
    return path.normalize(rootFolder.substr(1) + clickedFolder + className + '.php')
}