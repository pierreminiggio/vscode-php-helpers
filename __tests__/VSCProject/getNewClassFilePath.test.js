const getNewClassFilePath = require('../../src/VSCProject/getNewClassFilePath.js')

test('getNewClassFilePath in App', () => {
  expect(getNewClassFilePath('/f:/dev/cms', '/App/Controllers/', 'PostController')).toBe('f:\\dev\\cms\\App\\Controllers\\PostController.php')
})

test('getNewClassFilePath in helpers', () => {
  expect(getNewClassFilePath('/f:/dev/cms', '/helpers/', 'TestHelper')).toBe('f:\\dev\\cms\\helpers\\TestHelper.php')
})
