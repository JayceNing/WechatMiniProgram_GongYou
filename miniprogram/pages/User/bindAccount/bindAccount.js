// miniprogram/pages/me/bindAccount/bindAccount.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  usernameInput: function(e) {
    this.setData({
      username: e.detail.value
    });
  },
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    });
  },
  bindAccount:function(){
    var that=this
    if(that.data.username==null)
    {
      wx.showToast({
        title: '请输入用户名',
        icon:'error'
      })
    }else if(that.data.password==null)
    {
      wx.showToast({
        title: '请输入密码',
        icon:'error'
      })
    }else{
      that.loadModal()
    console.log('登录表单已提交，正在查询')
    wx.cloud.callFunction({
      name: 'login',
      data: { 
        username:that.data.username,
        password:that.data.password,
      },
      success: res => {
        console.log('[云函数] [login] : ', res.result)
        that.hideLoadModal()
        if(res.result.statusCode==401){
          wx.showToast({
            title: '用户不存在或密码错误',
            icon:'none',
            duration: 2000
          })
        }else{
            app.globalData.token=res.result.token
            let pages = getCurrentPages();
            let prevPage = pages[pages.length - 2]; //获取到上一页面
            prevPage.successBindAccount();
            wx.setStorage({
              key:"token",
              data:res.result.token
            })
            app.globalData.username=res.result.username
            wx.navigateBack({
              delta: 0,
            })
        }

      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    }
    
  
  },
  toRegister:function(){
    wx.navigateTo({
      url: '../register/register',
    })
  },
  testAccount:function(){
    this.setData({
      username: '测试账号',
      password: '123456',
      isChecked: true
    })
    wx.showToast({
      title: '账号密码已填入,请点击登录',
      icon: 'none',
      duration: 2000
    })
    
  },
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})