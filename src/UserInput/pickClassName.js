const vscode = require('vscode')

/**
 * @param {string} classType
 *
 * @return {Promise<string>}
 */
const pickClassName = classType => {
  return new Promise(resolve => {
    vscode.window.showInputBox({
      prompt: classType + ' Name'
    }).then(async className => {
      if (className === undefined) {
        return className
      }

      className = className.trim()

      if (!isValid(className)) {
        resolve(await pickClassName(classType))
      }

      resolve(className)
    })
  })
}

/**
 * @param {string} className
 *
 * @returns {boolean}
 */
const isValid = (className) => {
  if (className === '') {
    return false
  }

  if (!isNaN(className.substr(0, 1))) {
    return false
  }

  if (className.includes(' ')) {
    return false
  }

  return true
}

module.exports = pickClassName
