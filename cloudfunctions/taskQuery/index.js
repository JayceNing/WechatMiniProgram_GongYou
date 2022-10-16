// 云函数入口文件
const cloud = require('wx-server-sdk')
//引入request-promise用于做网络请求
var rp = require('request-promise');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let url = 'http://api.huawei-iot.charlie0129.top:10883/v1/packages';
  return await rp({
    url: url,
    method: "get",
    json: true,
    qs: {
      order:'desc',
      orderBy:'createdAt'
    },
    headers: {
      "content-type": "application/json",
      //'Authorization':'APPCODE 850d4015461548eeb7b24cafa9be5acf',
      //"content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  })
    .then(function (res) {
      console.log(res)
      return res
    })
    .catch(function (err) {
      return err
    });
  
}