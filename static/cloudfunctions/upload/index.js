const cloud = require('wx-server-sdk')
const fs = require('fs')
const path = require('path')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
exports.main = async (event, context) => {
  console.error(event.count)
  const { fileName, filePath } = event
  const fileStream = fs.createReadStream(path.join(__dirname, fileName))
  return await cloud.uploadFile({
    cloudPath: filePath,
    fileContent: fileStream,
  })
}