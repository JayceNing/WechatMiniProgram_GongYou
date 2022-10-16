// pages/User/User.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    bindGongyouAccount:false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
    //canIUseOpenData:false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    // if(app.globalData.token){
    //   this.setData({
    //     bindGongyouAccount:true
    //   })
    // }
    if(!app.globalData.openid){
      this.onGetOpenid()
    }else{
      this.setData({
        openid:app.globalData.openid,
        userinfo:app.globalData.userinfo
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onGetOpenid: function() {
    // 调用云函数
    const db=wx.cloud.database()
    var that=this
    that.loadModal()
    wx.cloud.callFunction({
      name: 'wxLogin',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result)
        that.setData({
          openid:res.result.openid
        })
        that.hideLoadModal()
        app.globalData.openid = res.result.openid
        db.collection('user_info').where({_openid:res.result.openid}).get({
          success: function(res) {
            // res.data 包含该记录的数据
            console.log(res)
            app.globalData.userinfo=res.data[0].userinfo
            that.setData({
              userinfo:res.data[0].userinfo
            })
          }
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  scanCode:function(){
    var that=this
    wx.scanCode({
      onlyFromCamera: true,
      success: (scres) => {
        console.log('scan result:',scres)
        wx.request({
          url: app.globalData.IoTSeverAddress+'/'+project_id+'/devices/'+scres.result+'/async-commands',
          method: 'POST',
          header:{
            "X-Auth-Token": app.globalData.HWtoken,
            "Content-Type": "application/json"
          },
          data: {
            "service_id":"Track",
            "command_name":"Lock_Control",
            "paras":{
              "Lock":"ON"
            },
            "expire_time":0,
            "send_strategy":"immediately"
          },
          dataType: 'json',
          success: (res) => {
            console.log(res)
            that.hideLoadModal()
            if(res.statusCode==200){
              wx.showToast({
                title: '开箱成功',
              })
            }else{
              wx.showToast({
                title: '出错啦',
                icon:'error'
              })
            }
       
          },
          fail: (res) => {
              console.log('request failed')
              console.log(res)
              that.hideLoadModal()
              wx.showToast({
                title: '获取出错',
                icon: 'error',
              })
          }
      })
      }
    })
  },

  mr: function(e) {
    wx.navigateTo ({
      url: '/pages/List/List?mid=0'
    })
  },
  imf: function(e) {
    wx.navigateTo ({
      url: '/pages/List/List?mid=1'
    })
  },
  // toBindAccount:function(){
  //   wx.navigateTo({
  //     url: '../User/bindAccount/bindAccount',
  //   })
  // },
  toUserInfo:function(){
    wx.navigateTo({
      url: '../User/userInfo/userInfo',
    })
  },
  toDefault:function(){
    wx.switchTab({
      url: '../Default/Default',
    })
  },
  // successBindAccount:function(){
  //   this.setData({
  //     bindGongyouAccount:true
  //   })
  //   wx.showToast({
  //     title: '绑定成功',
  //   })
  // },
  // unbindAccount:function(){
  //   app.globalData.token=null
  //   app.globalData.username=null
  //   this.setData({
  //     bindGongyouAccount:false
  //   })
  //   wx.showToast({
  //     title: '解绑成功',
  //   })
  // },
  loadModal:function() {
    this.setData({
      loadModal: true
    })
    var that=this
    setTimeout(function() {
      if(that.data.loadModal==true){
        that.hideLoadModal()
      wx.showToast({
        title: '网络出错',
        icon:'error'
      })
      }
    }, 10000)
  },
  hideLoadModal:function(){
    this.setData({
      loadModal: false
    })
  },
  onShareAppMessage: function () {
    return {
      title: '公邮“最后一公里”物流专家',
    }
  },
  onShareTimeline: function () {
    return {
      title: '公邮“最后一公里”物流专家',
    }
  },
  onShow:function(){
    this.setData({
      userinfo:app.globalData.userinfo
    })
  }
})