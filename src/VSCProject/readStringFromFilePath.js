const readVSDocumentFromFilePath = require('./readVSDocumentFromFilePath.js')

/**
 * @param {string} filePath
 *
 * @return {string}
 */
module.exports = filePath => {
  return new Promise((resolve, reject) => {
    readVSDocumentFromFilePath(filePath).then(document => resolve(document.getText())).catch(reject)
  })
}
