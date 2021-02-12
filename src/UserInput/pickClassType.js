const vscode = require('vscode')

/**
 * @return {Promise<string>}
 */
module.exports = () => {
    return new Promise(resolve => {
        vscode.window.showQuickPick(
            ['Abstract Class', 'Class', 'Interface', 'Trait'],
            {canPickMany: false}
        ).then(resolve)
    })
}