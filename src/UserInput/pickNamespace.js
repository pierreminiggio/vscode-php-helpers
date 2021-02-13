const vscode = require('vscode')

/**
 * @param {?string} namespace
 * 
 * @return {Promise<string>}
 */
module.exports = namespace => {
    return new Promise(resolve => {
        vscode.window.showInputBox({
            prompt: 'Namespace',
			value: namespace !== null ? namespace : ''
        }).then(resolve)
    })
}
