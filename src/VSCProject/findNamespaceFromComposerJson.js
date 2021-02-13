const autoloadKeys = ['autoload', 'autoload-dev']
const psr4Key = 'psr-4'

/**
 * @param {Object} composerJson
 * @param {string} clickedPath
 *
 * @return {?string}
 */
module.exports = (composerJson, clickedPath) => {
  for (const autoloadKeyId in autoloadKeys) {
    const autoloadKey = autoloadKeys[autoloadKeyId]
    if (composerJson[autoloadKey] === undefined) {
      continue
    }

    if (composerJson[autoloadKey][psr4Key] === undefined) {
      continue
    }

    const psr4 = composerJson[autoloadKey][psr4Key]
    for (const namespace in psr4) {
      const namespaceFolder = '/' + psr4[namespace]
      if (clickedPath.indexOf(namespaceFolder) === 0) {
        const relativeFolder = clickedPath.substr(namespaceFolder.length).slice(0, -1)

        if (relativeFolder === '') {
          return namespace.slice(0, -1)
        }

        return namespace + relativeFolder.split('/').join('\\')
      }
    }
  }

  return null
}
