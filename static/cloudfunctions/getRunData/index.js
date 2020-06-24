const cloud = require('wx-server-sdk')
const WXBizDataCrypt = require('./WXBizDataCrypt')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {encryptedData, sessionKey, iv} = event

  const pc = new WXBizDataCrypt(wxContext.APPID, sessionKey)

  const data = pc.decryptData(encryptedData, iv)
  console.log(data)
  return data
}
