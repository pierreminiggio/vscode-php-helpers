const vscode = require('vscode')

/**
 * @param {string} filePath
 * 
 * @return {string}
 */
module.exports = filePath => {
    return new Promise((resolve, reject) => {
        vscode.workspace.openTextDocument(filePath).then(document => resolve(document.getText())).catch(reject)
    })
}
