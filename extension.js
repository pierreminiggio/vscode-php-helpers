const vscode = require('vscode')
const composerJsonFilePathFinder = require('./src/composerJsonFilePathFinder.js')
const lastFolderFinder = require('./src/lastFolderFinder.js')
const namespaceFinder = require('./src/namespaceFinder.js')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	
	let disposable = vscode.commands.registerCommand('phphelpers.createClass', (host) => {


		const rootFolder = vscode.workspace.workspaceFolders[0].uri.path
		const clickedFolder = lastFolderFinder(rootFolder, host.path)
		
		const composerJsonPath = composerJsonFilePathFinder(rootFolder)
		vscode.workspace.openTextDocument(composerJsonPath).then((document) => {
			const text = document.getText();
			const json = JSON.parse(text)
			if (json === null) {
				vscode.window.showErrorMessage('Syntax error in your ' + composerJsonPath)
				return
			}
			
			const namespace = namespaceFinder(json, clickedFolder)

			vscode.window.showInputBox({
				prompt: 'Class Name'
			}).then(className => {
				vscode.window.showInputBox({
					prompt: 'Namespace',
					value: namespace !== null ? namespace : ''
				}).then(classNamespace => {
					console.log(className)
					console.log(classNamespace)
				})
			})

		}).catch(err => vscode.window.showErrorMessage('Could not open composer.json : ' + err))

		
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
