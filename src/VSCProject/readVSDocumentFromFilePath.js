const vscode = require('vscode')

/**
 * @param {string} filePath
 * 
 * @return {import('vscode').TextDocument}
 */
module.exports = filePath => {
    return new Promise((resolve, reject) => {
        vscode.workspace.openTextDocument(filePath).then(resolve).catch(reject)
    })
}
