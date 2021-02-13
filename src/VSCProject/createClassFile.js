const fs = require('fs')

/**
 * @param {string} filePath
 * @param {?string} namespace
 * @param {string} classType
 * @param {string} className
 */
module.exports = (filePath, namespace, classType, className) => {
  fs.writeFileSync(filePath, '<?php' +
    (
      namespace === null
        ? ''
        : (
                `

namespace ` +
                namespace +
                ';'
          )
    ) + `

` +
        classType +
        ' ' +
        className +
        `
{

}
`
  )
}
