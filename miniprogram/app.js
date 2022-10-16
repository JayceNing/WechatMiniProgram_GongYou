// app.js
App({
  onLaunch() {
    this.globalData={
      IoTSeverAddress:'https://iotda.cn-north-4.myhuaweicloud.com/v5/iot',
      userInfo: null,
      recList: [
        {
          'status': '派送中',
          'num': 'gyha8475',
          'picAddress': '出发地',
          'recAddress': '北京邮电大学沙河校区这里是超出隐藏测试假装有很多字虽然我不觉得谁的地址会这么长',
          'time': ''
        },
        {
          'status': '已取件',
          'num': 'abfs5846',
          'picAddress': '出发地',
          'recAddress': '街边鸽舍',
          'time': '2021-5-11 12:43:15'
        }
      ],
      picList: [
        {
          'status':'待派送',
          'num': 'udhe8463',
          'picAddress': '出发地',
          'recAddress':'三号大街',
          'guest':'张小姐',
          'time':'',
          'note':'这是一行备注',
        },
        {
          'status':'已送达',
          'num': 'jgyw2463',
          'picAddress': '出发地',
          'recAddress':'八号小巷',
          'guest':'王先生',
          'time':'2021-8-16 10:32:12',
          'note':'这是一行备注',
        }
      ]
    }
    wx.cloud.init()
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.getSystemInfo({
      success: e => {
        console.log(e)
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.WindowHeight=e.windowHeight;
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    var that=this
    // wx.getStorage({
    //   key: 'token',
    //   success (res) {
    //     console.log("公邮账号token",res.data)
    //     var token=res.data
        
    //     wx.cloud.callFunction({
    //       name: 'getUserInfo',
    //       data: { 
    //         token:res.data
    //       },
    //       success: res => {
    //         console.log('[云函数] [getUserInfo] : ', res.result)
    //         if(res.result.username!=null)
    //         {
    //           that.globalData.username=res.result.username
    //           that.globalData.token=token
    //         }
            
    //       },
    //       fail: err => {
    //         console.error('[云函数] [getUserInfo] 调用失败', err)
    //       }
    //     })
    //   }
    // })
    wx.request({
      url:'https://iam.cn-north-4.myhuaweicloud.com/v3/auth/tokens',
      method: 'POST',
      header:{
        "X-Auth-Token": "***",
        "Content-Type": "application/json;charset=UTF-8"
      },
      data: {
        "auth": {
          "identity": {
           "methods": [
            "password"
           ],
           "password": {
            "user": {
             "domain": {
              "name": "ningxinyu_bupt" //华为云IAM主账号名
             },
             "name": "ningxinyu_bupt", //用户名
             "password": "nxy99113" //密码
            }
           }
          }
         }
      },
      //dataType: 'json',
      success: (res) => {
        console.log("华为物联网平台",res)
        this.globalData.HWtoken=res.header['X-Subject-Token'] //token为返回结果header中的"X-Subject-Token
      },
      fail: (res) => {
          console.log('request failed')
          console.log(res)
          wx.showToast({
            title: '获取出错',
            icon: 'error',
          })
      }
  })
  },
  
})
