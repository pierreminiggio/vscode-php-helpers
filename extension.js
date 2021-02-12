const createClassFile = require('./src/VSCProject/createClassFile.js')
const findComposerJsonFilePath = require('./src/VSCProject/findComposerJsonFilePath.js')
const getNewClassFilePath = require('./src/VSCProject/getNewClassFilePath.js')
const findLastFolder = require('./src/VSCProject/findLastFolder.js')
const findNamespace = require('./src/VSCProject/findNamespace.js')
const pickClassName = require('./src/UserInput/pickClassName.js')
const pickNamespace = require('./src/UserInput/pickNamespace.js')
const pickClassType = require('./src/UserInput/pickClassType.js')
const readVSDocumentFromFilePath = require('./src/VSCProject/readVSDocumentFromFilePath.js')
const readStringFromFilePath = require('./src/VSCProject/readStringFromFilePath.js')
const vscode = require('vscode')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    
    const disposable = vscode.commands.registerCommand('phphelpers.createClass', async host => {

        const rootFolder = vscode.workspace.workspaceFolders[0].uri.path
        const clickedFolder = findLastFolder(rootFolder, host.path)
        
        const composerJsonPath = findComposerJsonFilePath(rootFolder)

        let text = null
        try {
            text = await readStringFromFilePath(composerJsonPath)
        } catch (err) {
            vscode.window.showErrorMessage('Could not open composer.json : ' + err)
        }

        let namespace = null

        if (text !== null) {
            const json = JSON.parse(text)
            if (json === null) {
                vscode.window.showErrorMessage('Syntax error in your ' + composerJsonPath)
            } else {
                namespace = findNamespace(json, clickedFolder)
            }
        }
        
        const classTypeDisplayName = await pickClassType()

        if (classTypeDisplayName === undefined) {
            return
        }

		const className = await pickClassName(classTypeDisplayName)

		if (className === undefined) {
			return
		}

		namespace = await pickNamespace(namespace)
        const classType = classTypeDisplayName.toLowerCase()

		const classFilePath = getNewClassFilePath(rootFolder, clickedFolder, className)
		createClassFile(classFilePath, namespace ? namespace : null, classType, className)

		vscode.window.showTextDocument(await readVSDocumentFromFilePath(classFilePath))
    })

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
